// const inquirer = require('inquirer');


getPrompts = [
    {
        name: 'name',
        type: 'input',
        message: 'What is your name?'
    },
    {
        name: 'age',
        type: 'input',
        message: 'What is your age?'
    },
    {
        name: 'color',
        type: 'list',
        message: 'What is your favorite color?',
        choices: ['red', 'blue', 'green']
    }
];


module.exports = getPrompts;