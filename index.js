//.then is a method, methods are actions that can be performed on objects--> object properties that have function values 
const connect = require('./db/connection');
const inquirer = require('inquirer');
const mysql = require('mysql2');
// use this to print out data? but why do we need this?
const ctable = require('console.table');


const promptQuestions = employeeData => {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
            }
        ])
        .then(function (userInput) {
            switch (userInput.action) {
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Remove Employee':
                    removeEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
            }
        })
}
// all views like this basically 
function viewEmployees() {
    connect.query(`SELECT * FROM employee`, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results);
        promptQuestions();
    })
}

function viewRoles() {
    connect.query(`SELECT * FROM roles`, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results);
        promptQuestions();
    })
}

function viewDepartments() {
    connect.query(`SELECT * FROM department`, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results);
        promptQuestions();
    })
}

connect.query(`SELECT * FROM employee`, (err, results) => {
    if(err) throw err;
    let employeeList = results.map((employees) => {
        return {
            name: `${employees.first_name} ${employees.last_name}`,
            value: employees.id 
        }
    })
    // updateEmployeeRole(employeeList); 
    removeEmployee(employeeList); 

})

// all adds like this basically 
// function addEmployee() {
//     return inquirer
//         .prompt([
//             {
//                 type: 'text',
//                 name: 'first-name',
//                 message: "What is the employee's first name?"
//             },
//             {
//                 type: 'text',
//                 name: 'last-name',
//                 message: "What is the employee's last name?"
//             }
//         ])
//         .then(connect.query(`SELECT * FROM roles`, (err, results) => {
//             if (err) {
//                 console.log(err)
//             }

//             let roleInfo = results.map((role) => {
//                 return {
//                     name: role.title,
//                     value: role.id
//                 }
//             })
//             function addEmployeeRole(roleInfo) {
//                 return inquirer
//                     .prompt([
//                         {
//                             type: 'list',
//                             name: 'employee-role',
//                             message: "What is the employee's role?",
//                             choices: roleInfo
//                             // in the middle, query to get roles, map through them, so we can get title that goes with id, display title and assign id. 
//                         }

//                     ])
//                     .then(
//                         connect.query(`SELECT * FROM manager`, (err, results) => {
//                             if (err) {
//                                 console.log(err)
//                             }

//                             let employManager = results.map((manager) => {

//                                 return {
//                                     name: `${manager.first_name} ${manager.last_name}`,
//                                     value: manager.id
//                                 }
//                             })

//                             function addEmployeeManager(employManager) {
//                                 return inquirer
//                                     .prompt([
//                                         {
//                                             type: 'list',
//                                             name: 'employee-manager',
//                                             message: "Who is the employee's manager?",
//                                             choices: employManager
//                                         }

//                                     ])
//                                     .then((answer) => {
//                                         //    console.log(answer)
//                                         //     //connect.query(`INSERT INTO candidates (first_name, last_name, role_id, manager_id) VALUES(${answer.first_name},${answer.last_name},${answer.role_id},${answer.manager_id})`);
//                                         //     // eventuall want to get the employee name displayed 
//                                         //     console.log(`Added employee to the database.`)
//                                         // })
//                                         promptQuestions();
//                                     })
//                             }
//                         })
//                     )
//             }
//         }
//         )
//         )
// }

// function addRole() {
//     return inquirer
//         .prompt([
//             {
//                 type: 'text',
//                 name: 'name',
//                 message: 'What is the name of the role?',
//             },
//             {
//                 type: 'text',
//                 name: 'salary',
//                 message: 'What is the salary of the role?'
//             }
//         ])
//         .then(connect.query(`SELECT * FROM department`, (err, results) => {
//             if (err) {
//                 console.log(err)
//             }
//             let departmentInfo = results.map((department) => {
//                 return {
//                     name: department.names,
//                     value: department.id
//                 }
//             })
//             function addRoleDepartment(departmentInfo) {
//                 return inquirer
//                     .prompt([
//                         {
//                             type: 'list',
//                             name: 'departmentSelect',
//                             message: 'Which department does the role belong to?',
//                             choices: departmentInfo
//                         }
//                     ]).then(
//                         function addDepartment() {
//                             return inquirer
//                                 .prompt([
//                                     {
//                                         type: 'text',
//                                         name: 'department-name',
//                                         message: 'What is the name of the department?',
//                                     }
//                                 ])
//                                 .then(
//                                     // insert all answers into department 
//                                     connect.query(`INSERT INTO department`)
//                                 )
//                         })
//             }
//         }))
// }



//update functions 
// function updateEmployeeRole(employeeList, employeeRole) {
//     return inquirer
//     .prompt([
//         {
//             type: 'list',
//             name: 'employee-list',
//             message: "Which employee's role do you want to update?",
//             choices: employeeList
//         },
//         {
//             type: 'list',
//             name: 'role-type',
//             message: "What is the employee's new role?",
//             choices: employeeRole
//         }
//     ]).then(
//         connect.query(`UPDATE employee SET role_id = ${value}`)
//     )
// }

//delete functions 
function removeEmployee(employeeList) {
    return inquirer
    .prompt([ 
        {
            type: 'list',
            name:'removeEmployee',
            message: 'Which employee would you like to remove?',
            choices: employeeList
        }
    ]).then((removedEmployee) => {
        console.log(removedEmployee)
        let employeeID = removedEmployee.removeEmployee
        console.log(employeeID)
        
        connect.query(`DELETE FROM employee WHERE id = ${employeeID};`, (err, result) => {
        if(err) throw err
        console.log(`Employee has been removed`)
        })
    })
}


promptQuestions(); 