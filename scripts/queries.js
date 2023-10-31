const mysql = require('mysql2');

// var pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'localhost',
//     user: process.env.SQLUSER,
//     password: process.env.SQLPASSWORD,
//     database: 'company_db'
// });

// function query() {
//     db.query('SELECT * FROM employee', function (err, results) {
//         console.table(results);
//         return results;
//     });
// }

let query = `SELECT e.id as Employee_ID, CONCAT(e.first_name," ", e.last_name) as Employee_Name, role.title, CONCAT(m.FIRST_NAME," ",m.last_name) as Manager 
    from EMPLOYEE e 
    join role on e.role_id = role.id 
    join employee m where e.MANAGER_ID = m.ID;`;



// switch (response.choice) {
//     case "See all employees":
//         db.query('SELECT * FROM employee', function (err, results) {
//             console.table(results);
//             return results;
//         });
//         break;
//     case "See all roles":
//         db.query('SELECT * FROM role', function (err, results) {
//             console.table(results);
//             return results;
//         });
//         break;
//     case "See all departments":
//         db.query('SELECT * FROM department', function (err, results) {
//             console.table(results);
//             return results;
//         });
//         break;
// }


module.exports = { query };