const mysql = require('mysql2');

// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: process.env.SQLUSER,
//         password: process.env.SQLPASSWORD,
//         database: 'company_db'
//     },
// );

function query() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        return results;
    });
}





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


module.exports = query;