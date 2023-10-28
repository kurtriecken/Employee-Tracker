const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const prompts = require('./scripts/prompts');
require('dotenv').config();

const figlet = require('figlet');

// const PORT = process.env.PORT || 3000;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.SQLUSER,
        password: process.env.SQLPASSWORD,
        database: 'company_db'
    },
    console.log('Succesfully connect to company_db database!')
);

// TESTING queries
// db.query('SELECT * FROM department', function (err, results) {
//     console.table(results);
// });
// db.query('SELECT * FROM role', function (err, results) {
//     console.table(results);
// });
// db.query('SELECT * FROM employee', function (err, results) {
//     console.table(results);
// });

async function main() {
    // console.log(prompts.getPrompts);
    const answers = await inquirer.prompt(prompts);
    console.log(answers);
};


// Default response for other requests
app.use((req, res) => {
    res.status(404).end();
});

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// })

figlet("Radical, Dude!\nLet's Party!", function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
    }
    console.log(data);
});
// main();