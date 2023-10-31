
const inquirer = require('inquirer');
const prompts = require('./scripts/prompts');
const mysql = require('mysql2/promise');
const { trace } = require('console');
const { query } = require('./scripts/queries.js')

require('dotenv').config();

const figlet = require('figlet');
const welcome = require('./scripts/welcome')




// Connect to the database
// const db = mysql.createConnection(
//     {
//         host: '127.0.0.1',
//         user: process.env.SQLUSER,
//         password: process.env.SQLPASSWORD,
//         database: 'company_db'
//     },
// );

// CHANGE TO CREATE CONNECTION
// DO NOT USE POOL
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: process.env.SQLUSER,
    password: process.env.SQLPASSWORD,
    database: 'company_db'
});

async function getEmployees() {
    console.table((await pool.query(`SELECT e.id as Employee_ID, CONCAT(e.first_name," ", e.last_name) as Employee_Name, role.title, CONCAT(m.FIRST_NAME," ",m.last_name) as Manager 
    from EMPLOYEE e 
    join role on e.role_id = role.id 
    join employee m where e.MANAGER_ID = m.ID;`))[0]);
};

async function getRoles() {
    console.table((await pool.query(`SELECT title, role.id AS Role_ID, department.name AS Department_Name, salary
    FROM role INNER JOIN department WHERE department_id = department.id`))[0]);
};

async function getDepartments() {
    console.table((await pool.query('SELECT * FROM department'))[0]);
};

async function addDepartment() {
    const newDep = await inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What would you like the department to be called?'
        }
    ]);
    await pool.query(`INSERT INTO department (name) VALUES ("${newDep.department}");`);
}

async function addRole() {
    // let depList = await pool.query('SELECT name FROM department');
    // console.log(depList[0][0].name);
    let depArr = (await pool.query('SELECT name FROM department'))[0].map((obj) => obj.name)
    // console.log(depArr);
    const newRole = await inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What would you like the role to be called?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role (in dollars)?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'To which department does this role belong?',
            choices: depArr
        }
    ]);
    let depID = (await pool.query(`SELECT id FROM department WHERE name = "${newRole.department}";`))[0][0].id;
    console.log(depID);
    await pool.query(`INSERT INTO role (title, salary, department_id) VALUES ("${newRole.role}", "${newRole.salary}", ${depID});`);
};

async function addEmployee() {
    let roleArr = (await pool.query('SELECT title FROM role'))[0].map((obj) => obj.title);
    let manArr = (await pool.query('SELECT first_name, last_name FROM employee'))[0].map((obj) => obj.first_name + ' ' + obj.last_name);

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
    let depID = (await pool.query(`SELECT id FROM role 
        WHERE title = "${newEmp.role}";`))[0][0].id;
    let manID = (await pool.query(`SELECT id FROM employee 
        WHERE first_name = "${newEmp.manager.split(' ')[0]}" AND last_name = "${newEmp.manager.split(' ')[1]}";`))[0][0].id;

    let nameArr = newEmp.name.split(' ');
    let firstName = nameArr[0];
    let lastName = nameArr[1];

    await pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES ("${firstName}", "${lastName}", ${depID}, ${manID});`);
};

async function updateEmployee() {
    let empArr = (await pool.query('SELECT first_name, last_name FROM employee'))[0].map((obj) => obj.first_name + ' ' + obj.last_name);
    let roleArr = (await pool.query('SELECT title FROM role'))[0].map((obj) => obj.title);

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
    let roleID = (await pool.query(`SELECT id FROM role 
        WHERE title = "${empUpdate.role}";`))[0][0].id;
    let nameArr = empUpdate.name.split(' ');
    let firstName = nameArr[0];
    let lastName = nameArr[1];

    await pool.query(`UPDATE employee SET role_id = ${roleID} WHERE first_name = "${firstName}" AND last_name = "${lastName}";`)

}

async function askQuestions() {
    const answers = await inquirer.prompt(prompts);
    // console.trace(answers);
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