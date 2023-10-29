const inquirer = require('inquirer');



// getPrompts = [
//     {
//         name: 'choice',
//         type: 'list',
//         message: 'What information would you like to see?',
//         choices : [
//             {
//                 name: "See all employees"
//             },
//             {
//                 name: "See all departments"
//             },
//             {
//                 name: "See all roles"
//             }
//         ],
//         default: "See all departments"
//     }
// ];

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

// const initialQuestion = () => {
//     inquirer.prompt()
//     .then((response) => {

//         };
//     })
// }

module.exports = initialQuestionsArr;