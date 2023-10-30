const express = require('express');
const inquirer = require('inquirer');
const prompts = require('./scripts/prompts');
const mysql = require('mysql2/promise');
const { trace } = require('console');
// const query = require('./scripts/queries')
// const util = require('util');
require('dotenv').config();

const figlet = require('figlet');
const welcome = require('./scripts/welcome')

const PORT = process.env.PORT || 3000;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


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
    console.table((await pool.query(`select CONCAT(e.first_name," ", e.last_name) as Employee_Name, role.title, CONCAT(m.FIRST_NAME," ",m.last_name) as Manager from EMPLOYEE e join role on e.role_id = role.id join employee m where e.MANAGER_ID = m.ID;`))[0]);
};

async function getRoles() {
    console.table((await pool.query('SELECT * FROM role'))[0]);
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
    let roleArr = (await pool.query('SELECT title FROM role'))[0].map((obj) => obj.name)
    console.log(roleArr);
    let manArr = (await pool.query('SELECT first_name, last_name FROM employee'))[0].map((obj) => obj.name)
    console.log(manArr);
    const newEmp = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the employee's name?"
        }
    ]);
    let fullName = newEmp.name;
    console.trace(fullName);
    let nameArr = fullName.split(' ');
    let firstName = nameArr[0];
    let lastName = '';
    if (nameArr.length != 1) {
        lastName = nameArr[1];
    }
    console.log(nameArr);
    console.log(`first name: ${firstName}, last name: ${lastName}`);
    await pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", 2, 2);`);
};

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
    
};



async function main() {
    await welcome();
    await askQuestions();
};


// Default response for other requests
// app.use((req, res) => {
//     res.status(404).end();
// });

// app.listen(PORT, () => {
//     // console.log(`Server running on port ${PORT}`);
// })

// welcome();
main();