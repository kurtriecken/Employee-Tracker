const inquirer = require('inquirer');

const initialQuestionsArr = [
    {
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices : [
            {
                name: "See all employees"
            },
            {
                name: "See all departments"
            },
            {
                name: "See all roles"
            },
            {
                name: "Add a department"
            },
            {
                name: "Add a role"
            },
            {
                name: "Add an employee"
            },
            {
                name: "Update an employee role"
            }
        ],
        default: "See all departments"
    }
];



module.exports = initialQuestionsArr;