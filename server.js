const express = require('express');
const inquirer = require('inquirer');
const prompts = require('./scripts/prompts');
const mysql = require('mysql2/promise');
const { trace } = require('console');
// const query = require('./scripts/queries')
// const util = require('util');
require('dotenv').config();

// const figlet = require('figlet');
// const welcome = require('./scripts/welcome')

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
    // console.trace(whatever);
    console.table((await pool.query('SELECT * FROM employee'))[0]);
};

async function getRoles() {
    // console.trace(whatever);
    console.table((await pool.query('SELECT * FROM role'))[0]);
};

async function askQuestions() {
    const answers = await inquirer.prompt(prompts);
    // console.trace(answers);
    if (answers.choice == 'See all employees') {
        await getEmployees();
    }
    else if (answers.choice == 'See all roles') {
        await getRoles();
    }
    // await getEmployees(answers);
    // await getRoles();
    // console.table(data);
    askQuestions();
};

askQuestions();

// TESTING queries
// async function testQuery() {
//     console.trace('in here');
//     const db = await mysql.createConnection(
//         {
//             host: '127.0.0.1',
//             user: process.env.SQLUSER,
//             password: process.env.SQLPASSWORD,
//             database: 'company_db'
//         },
//     );
//     await db.execute('SELECT * FROM employee', function (err, results) {
//         console.trace('in here');
//         console.table(results);
//     });
//     // (await db).end();
//     // switch (response.choice) {
//     //     case "See all employees":
//     //         db.query('SELECT * FROM employee', function (err, results) {
//     //             console.table(results);
//     //             return results;
//     //         });
//     //         break;
//     //     case "See all roles":
//     //         db.query('SELECT * FROM role', function (err, results) {
//     //             console.table(results);
//     //             return results;
//     //         });
//     //         break;
//     //     case "See all departments":
//     //         db.query('SELECT * FROM department', function (err, results) {
//     //             console.table(results);
//     //             console.log(typeof results);
//     //             return results;
//     //         });
//     //         break;
//     // }
// };

// async function initQuestion()  {
//     await inquirer.prompt(prompts)
//         .then((response) => {
//             console.trace(response);
//             // return query('SELECT * FROM employee');
//             testQuery();
//             // switch (response.choice) {
//             //     case "See all employees":
//             //         db.query('SELECT * FROM employee', function (err, results) {
//             //             console.table(results);
//             //             return results;
//             //         });
//             //         break;
//             //     case "See all roles":
//             //         db.query('SELECT * FROM role', function (err, results) {
//             //             console.table(results);
//             //             return results;
//             //         });
//             //         break;
//             //     case "See all departments":
//             //         db.query('SELECT * FROM department', function (err, results) {
//             //             console.table(results);
//             //             console.log(typeof results);
//             //             return results;
//             //         });
//             //         break;
//             // }
//             // console.log('\n');
//         })
//         .then((res) => {
//             console.trace(typeof res);
//             initQuestion();
//         })
// };

// function main() {
//     // initQuestion();
// };


// Default response for other requests
// app.use((req, res) => {
//     res.status(404).end();
// });

// app.listen(PORT, () => {
//     // console.log(`Server running on port ${PORT}`);
// })

// welcome();
// main();