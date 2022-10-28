// const express = require('express');
const connect = require('./db/connection');
// const apiEmployee = require('./routes/apiRoutes/Employee');
// const apiRoles = require('./routes/apiRoutes/Roles');
// const apiDepartments = require('./routes/apiRoutes/Departments'); 
const inquirer = require('inquirer');
const mysql = require('mysql2'); 
// const fs = require('fs'); 
// const PORT = process.env.PORT || 3001;
// const app = express();
// use this to print out data? but why do we need this?
const ctable = require('console.table'); 

const promptQuestions = employeeData => {
  return inquirer
  .prompt([
      {
          type: 'list',
          name:'action',
          message: 'What would you like to do?',
          choices:['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
      }
  ])
  .then(function(userInput) {
      switch(userInput.action){
          case 'View All Employees':
              viewEmployees();
              break; 
          case 'Add Employee':
              addEmployee();
              break; 
          case 'Update Employee Role':
              updateEmployeeRole();
              break; 
          case 'Delete Employee':
              deleteEmployee();
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
        if(err) {
            console.log(err)
        }
        console.table(results); 
        promptQuestions(); 
    })
}

function viewRoles(){
    connect.query(`SELECT * FROM roles`, (err, results) => {
        if(err) {
            console.log(err)
        }
        console.table(results);
        promptQuestions(); 
    })
}

function viewDepartments(){
    connect.query(`SELECT * FROM department`, (err, results) => {
        if(err){
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
            name: 'first-name',
            message: "What is the employee's first name?"
        },
        {
            type: 'text',
            name: 'last-name',
            message: "What is the employee's last name?"
        }
    ])
}
        
            connect.query(`SELECT id,title FROM roles`, (err, results) => {
                if(err){
                    console.log(err)
                }
           
            let roleInfo = results.map((role) => {
                return{
                    name: role.title,
                    value: role.id
                    }
                })
                console.log(roleInfo)
            addEmployeeRole(roleInfo)
            })
            
function addEmployeeRole(roleInfo) {
        return inquirer
        .prompt([
        {
            type: 'list',
            name: 'employee-role',
            message: "What is the employee's role?",
            choices: roleInfo
        // in the middle, query to get roles, map through them, so we can get title that goes with id, display title and assign id. 
            
        }
   
    ])
}

connect.query(`SELECT * FROM manager`, (err,results) => {
    if(err) {
        console.log(err)
    }
console.log(results)
    let employManager = results.map((manager) => {
        
        return {
            name: `${manager.first_name} ${manager.last_name}`,
            value: manager.id
        }
    })
    console.log(employManager)
    addEmployeeManager(employManager); 
})

function addEmployeeManager(employManager) {
    return inquirer 
    .prompt([
       {
            type: 'list',
            name: 'employee-manager',
            message: "Who is the employee's manager?",
            choices: employManager
        }
    ])
    .then(
        // eventuall want to get the employee name displayed 
        console.log(`Added employee to the database.`)
    )
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
    ])
} 

connect.query(`SELECT * FROM department`, (err, results) => {
    if(err){
        console.log(err)
    }
    let departmentInfo = results.map((department) => {
        return {
            name: department.names, 
            value: department.id
        }
    })
    addRoleDepartment(departmentInfo); 
})

function addRoleDepartment(departmentInfo) {
    return inquirer
    .prompt([
        {
            type: 'list',
            name: 'departmentSelect',
            message: 'Which department does the role belong to?',
            choices: departmentInfo
        }
    ])
}

// function addDepartment(){
//     return inquirer
//     .prompt([
//         {
//             type: 'text',
//             name: 'department-name',
//             message: 'What is the name of the department?',
//         }
//     ])
//     .then(
//         connect.query(``)
//     )
// }


// //update functions 
// function updateEmployeeRole() {
//     return inquirer
//     .prompt([
//         {
//             type: 'list',
//             name: 'employee-list',
//             message: "Which employee's role do you want to update?",
//             choices: ['']
//         },
//         {
//             type: 'list',
//             name: 'role-type',
//             message: "What is the employee's new role?",
//             choices: ['Sales Lead', 'Sales Associate', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer']
//         }
//     ])
// }

// //delete functions 
// function deleteEmployee() {

// }


promptQuestions(); 