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
                choices: ['View All Employees', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
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
                case 'Quit':
                    endEdit();
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


// all adds like this basically 
function addEmployee() {
  
        return inquirer
            .prompt([
                {
                    type: 'text',
                    name: 'first_name',
                    message: "What is the employee's first name?"
                },
                {
                    type: 'text',
                    name: 'last_name',
                    message: "What is the employee's last name?"
                }
            ]).then((person) => {
                addEmployeeRole(person)})

      
    

    function addEmployeeRole(person) {
        let employeeName = person; 
        console.log(employeeName)
     
        connect.query(`SELECT * FROM roles`, (err, results) => {
            if (err) {
                console.log(err)
            }
    
            let roleInfo = results.map((role) => {
                return {
                    name: role.title,
                    value: role.id
                }
            })
           
          askEmployeeRole(roleInfo)
        })
        function askEmployeeRole(roleInfo) {
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'role_id',
                    message: "What is the employee's role?",
                    choices: roleInfo
                    // in the middle, query to get roles, map through them, so we can get title that goes with id, display title and assign id. 
                }
            ]).then((role) => { 
                let newRole = role; 
                let employeeNameRole = Object.assign(employeeName, newRole); 
                console.log(employeeNameRole) 
                addEmployeeManager(employeeNameRole)})
        }
    }

    function addEmployeeManager(employeeNameRole) {
        console.log(employeeNameRole)
        connect.query(`SELECT * FROM manager`, (err, results) => {
            if (err) {
                console.log(err)
            }
            let employManager = results.map((manager) => {
                return {
                    name: `${manager.first_name} ${manager.last_name}`,
                    value: manager.id
                }
            })
            askEmployeeManager(employManager) 
        })
        function askEmployeeManager(employManager) {
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'manager_id',
                    message: "Who is the employee's manager?",
                    choices: employManager
                }
            ]).then((manager) => {
                let newManager = manager; 
                let employeeFacts = Object.assign(employeeNameRole, newManager)
                console.log(employeeFacts)
                insertEmployee(employeeFacts)
            })
        }
    }

    function insertEmployee(employeeFacts) {
        console.log(employeeFacts.first_name) 
        connect.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id)VALUES('${employeeFacts.first_name}','${employeeFacts.last_name}','${employeeFacts.role_id}','${employeeFacts.manager_id}')`, (err, result) => {
            if(err) throw err

            console.log(`${employeeFacts.first_name} ${employeeFacts.last_name} added to database.`)
        })
    }
}


function addRole() {

        return inquirer
            .prompt([
                {
                    type: 'text',
                    name: 'name',
                    message: 'What is the name of the role?',
                },
                {
                    type: 'text',
                    name: 'salary',
                    message: 'What is the salary of the role?'
                }
            ]).then((roleNameSalary) => {
                addRoleDepartment(roleNameSalary)
            })

    function addRoleDepartment(roleNameSalary) {
        
        connect.query(`SELECT * FROM department`, (err, results) => {
            if (err) {
                console.log(err)
            }
            let departmentInfo = results.map((department) => {
                return {
                    name: department.names,
                    value: department.id
                }
    
            })
            chooseDepartment(departmentInfo);
        })
        function chooseDepartment() {
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'departmentSelect',
                    message: 'Which department does the role belong to?',
                    choices: departmentInfo
                }
            ]).then(() => {
                addDepartment()
            })
        }
    }


    function addDepartment() {
        return inquirer
            .prompt([
                {
                    type: 'text',
                    name: 'department-name',
                    message: 'What is the name of the department?',
                }
            ])
        // .then(
        //     // insert all answers into department 
        //     connect.query(`INSERT INTO department`)
        // )
    }
}


// //delete functions 
// function removeEmployee() {
//     connect.query(`SELECT * FROM employee`, (err, results) => {
//         if (err) throw err;
//         let employeeList = results.map((employees) => {
//             return {
//                 name: `${employees.first_name} ${employees.last_name}`,
//                 value: employees.id
//             }
//         })
//         deleteEmployee(employeeList);
//         // removeEmployee(employeeList); 

//     })
//     function deleteEmployee(employeeList) {
//         return inquirer
//             .prompt([
//                 {
//                     type: 'list',
//                     name: 'removeEmployee',
//                     message: 'Which employee would you like to remove?',
//                     choices: employeeList
//                 }
//             ]).then((removedEmployee) => {
//                 console.log(removedEmployee)
//                 let employeeID = removedEmployee.removeEmployee
//                 console.log(employeeID)

//                 connect.query(`DELETE FROM employee WHERE id = ${employeeID};`, (err, result) => {
//                     if (err) throw err
//                     console.log(`Employee has been removed`)
//                 })
//             })
//     }
// }


// //update functions 
// function updateEmployeeRole() {
    
//         connect.query(`SELECT * FROM employee`, (err, results) => {
//             if (err) throw err;
//             let employeeList = results.map((employees) => {
//                 return {
//                     name: `${employees.first_name} ${employees.last_name}`,
//                     value: employees.id
//                 }
//             })
//             roleEmployeeList(employeeList);
//         })

//         function roleEmployeeList(employeeList) {
//             return inquirer
//                 .prompt([
//                     {
//                         type: 'list',
//                         name: 'employee-list',
//                         message: "Which employee's role do you want to update?",
//                         choices: employeeList
//                     }
//                 ]).then(() => { chooseNewRole()})
//         }
    
//     function chooseNewRole() {
//         connect.query(`SELECT * FROM roles`, (err, results) => {
//             if (err) {
//                 console.log(err)
//             }

//             let roleInfo = results.map((role) => {
//                 return {
//                     name: role.title,
//                     value: role.id
//                 }
//             })
//             updateRoleEmployeeRole(roleInfo);
//         })

//         function updateRoleEmployeeRole(roleInfo) {
//             console.log(roleInfo)
//             return inquirer
//                 .prompt([
//                     {
//                         type: 'list',
//                         name: 'newRole',
//                         message: "What is the employee's new role?",
//                         choices: roleInfo
//                     }
//                 ]).then((updatedRole) => {
//                     console.log(updatedRole)
//                     let roleID = updatedRole.newRole
//                     console.log(roleID)
//                     // somehow need to indicate the eployee id as well? a join? 
//                     connect.query(`INSERT INTO employee WHERE id = ${roleID};`, (err, result) => {
//                         if (err) throw err
//                         console.log(`Employee role has been updated`)
//                     })
//                 })
//         }
    
// }
// }

// function endEdit() {
//     process.exit();
// }

// promptQuestions(); 