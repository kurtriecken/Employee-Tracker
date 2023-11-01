// Queries file
let getEmployeeData = `select E.id as EMPLOYEE_ID, CONCAT(e.first_name," ", e.last_name) as Employee_Name, R.title as Job_title, D.name as Dep_Name, R.SALARY as Salary, CONCAT(M.first_name," ", M.last_name) as Manager 
from EMPLOYEE E 
inner join role R
on E.ROLE_ID = R.ID
inner join (
    select id, name
    from DEPARTMENT 
    ) D
    on R.DEPARTMENT_ID = D.id
inner join (
    select id, first_name, last_name
    from EMPLOYEE
    ) M
    on E.MANAGER_ID = M.ID;`;

let getRoleData = `SELECT title, role.id AS Role_ID, department.name AS Department_Name, salary
FROM role INNER JOIN department WHERE department_id = department.id;`;

let getDepartmentData = 'SELECT * FROM department;';

let addDepartmentQuery = `INSERT INTO department (name) VALUES (?);`;

let getDeptNames = 'SELECT name FROM department';

let getDeptNameByID = `SELECT id FROM department WHERE name = ?;`

let addNewRole = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`;

let getRoleTitles = 'SELECT title FROM role;';

let getEmployeeNames = 'SELECT first_name, last_name FROM employee;';

let getRoleIDByTitle = `SELECT id FROM role WHERE title = ?;`;

let getEmployeeIDByName = `SELECT id FROM employee WHERE first_name = ? AND last_name = ?;`;

let insertNewEmployee = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;

let updateEmployeeRole = `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?;`

module.exports = { getEmployeeData, 
    getRoleData, getDepartmentData, 
    addDepartmentQuery, getDeptNames,
    getDeptNameByID, addNewRole,
    getRoleTitles, getEmployeeNames,
    getRoleIDByTitle, getEmployeeIDByName,
    insertNewEmployee, updateEmployeeRole };