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
        message: 'What information would you like to see?',
        choices : [
            {
                name: "See all employees"
            },
            {
                name: "See all departments"
            },
            {
                name: "See all roles"
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