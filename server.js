// Module imports
const inquirer = require('inquirer');

const mysql = require('mysql2/promise');
require('dotenv').config();
const welcome = require('./scripts/welcome')

const { initialQuestionsArr,
    addDepArr, 
    } = require('./scripts/prompts');

const { getEmployeeData, 
    getRoleData,
    getDepartmentData,
    addDepartmentQuery,
    getDeptNames,
    getDeptNameByID, 
    addNewRole,
    getRoleTitles, 
    getEmployeeNames,
    getRoleIDByTitle,
    getEmployeeIDByName,
    insertNewEmployee,
    updateEmployeeRole} = require('./scripts/queries')

// Create connection
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: process.env.SQLUSER,
    password: process.env.SQLPASSWORD,
    database: 'company_db'
});

async function getEmployees() {
    console.table((await pool.query(getEmployeeData))[0]);
};

async function getRoles() {
    console.table((await pool.query(getRoleData))[0]);
};

async function getDepartments() {
    console.table((await pool.query(getDepartmentData))[0]);
};

async function addDepartment() {
    const newDep = await inquirer.prompt(addDepArr);
    await pool.query(addDepartmentQuery, newDep.department);
}

async function addRole() {
    let depArr = (await pool.query(getDeptNames))[0].map((obj) => obj.name)
    const newRole = await inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What would you like the role to be called?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role (in dollars)?',
            validate(salary) {
                if (isNaN(salary)) {
                    return 'Must enter a number!';
                } else {
                    return true;
                }
            }
        },
        {
            type: 'list',
            name: 'department',
            message: 'To which department does this role belong?',
            choices: depArr
        }
    ]);
    let depID = (await pool.query(getDeptNameByID, newRole.department))[0][0].id;
    await pool.query(addNewRole, [ newRole.role, newRole.salary, depID ]);
};

async function addEmployee() {
    let roleArr = (await pool.query(getRoleTitles))[0].map((obj) => obj.title);
    let manArr = (await pool.query(getEmployeeNames))[0].map((obj) => obj.first_name + ' ' + obj.last_name);

    const newEmp = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the employee's name?"
        },
        {
            type: 'list',
            name: 'role',
            message: "What is this employee's role?",
            choices: roleArr
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is this employee's manager?",
            choices: manArr
        }
    ]);
    let depID = (await pool.query(getRoleIDByTitle, newEmp.role))[0][0].id;
    let manID = (await pool.query(getEmployeeIDByName, [newEmp.manager.split(' ')[0], newEmp.manager.split(' ')[1]]))[0][0].id;

    let nameArr = newEmp.name.split(' ');
    let firstName = nameArr[0];
    let lastName = nameArr[1];

    await pool.query(insertNewEmployee, [firstName, lastName, depID, manID]);
};

async function updateEmployee() {
    let empArr = (await pool.query(getEmployeeNames))[0].map((obj) => obj.first_name + ' ' + obj.last_name);
    let roleArr = (await pool.query(getRoleTitles))[0].map((obj) => obj.title);

    const empUpdate = await inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: 'Which employee would you like to update?',
            choices: empArr
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is their new role?',
            choices: roleArr
        }
    ]);
    let roleID = (await pool.query(getRoleIDByTitle, empUpdate.role))[0][0].id;
    let nameArr = empUpdate.name.split(' ');
    let firstName = nameArr[0];
    let lastName = nameArr[1];

    await pool.query(updateEmployeeRole, [roleID, firstName, lastName]);

}

async function askQuestions() {
    const answers = await inquirer.prompt(initialQuestionsArr);
    if (answers.choice == 'See all employees') {
        await getEmployees();
        await askQuestions();
    }
    else if (answers.choice == 'See all roles') {
        await getRoles();
        await askQuestions();
    }
    else if (answers.choice == 'See all departments') {
        await getDepartments();
        await askQuestions();
    }
    else if (answers.choice == 'Add a department') {
        await addDepartment();
        await askQuestions();
    }
    else if (answers.choice == 'Add a role') {
        await addRole();
        await askQuestions();
    }
    else if (answers.choice == 'Add an employee') {
        await addEmployee();
        await askQuestions();
    }
    else if (answers.choice == 'Update an employee role') {
        await updateEmployee();
        await askQuestions();
    }

};

async function main() {
    await welcome();
    await askQuestions();
};

main();