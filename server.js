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

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: process.env.SQLUSER,
    password: process.env.SQLPASSWORD,
    database: 'company_db'
});

async function getEmployees() {
    console.table((await pool.query('SELECT * FROM employee'))[0]);
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
    // console.trace(newDep);
    // console.trace(newDep.name);
    await pool.query(`INSERT INTO department (name) VALUES ("${newDep.department}");`);
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
    };
    
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