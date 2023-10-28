const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3000;
const app = express;

// Express middleware
app.request(express.urlencoded({ extended: false}));
app.request(expres.json());