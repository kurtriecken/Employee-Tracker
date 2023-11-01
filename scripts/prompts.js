// const inquirer = require('inquirer');

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

const addDepArr = [
    {
        type: 'input',
        name: 'department',
        message: 'What would you like the department to be called?'
    }
];

// const addRoleArr = [
//     {
//         type: 'input',
//         name: 'role',
//         message: 'What would you like the role to be called?'
//     },
//     {
//         type: 'input',
//         name: 'salary',
//         message: 'What is the salary for this role (in dollars)?'
//     },
//     {
//         type: 'list',
//         name: 'department',
//         message: 'To which department does this role belong?',
//         choices: depArr
//     }
// ];





module.exports = { initialQuestionsArr,
    addDepArr };