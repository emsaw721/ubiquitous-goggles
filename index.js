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
    ]).then(
        
            connect.query(`SELECT id,title FROM roles`, (err, results) => {
                if(err){
                    console.log(err)
                }
            console.log(results)
           
            results.map((role) => {
                return{
                    name: role.title,
                    value: role.id
                    }
                })
            })
    ).then([
          
        {
            type: 'list',
            name: 'employee-role',
            message: "What is the employee's role?",
            choices:[]
        // in the middle, query to get roles, map through them, so we can get title that goes with id, display title and assign id. 
            
        }
   
    ])

    // ).then ([
    //     // same thing 
    //     {
    //         type: 'list',
    //         name: 'employee-manager',
    //         message: "Who is the employee's manager?",
    //         // same thing as above for here 
    //         choices: ['None', 'John Doe', 'Mike Chan', 'Ashley Rodriquez', 'Kevin Tupik', 'Kumal Singh', 'Malia Brown']
    //     }
    // ])
    // .then([
    //      //console. log (`Added ${body.first_name}${body.last_name} to the database.`,)
    //      promptQuestions() 
}
function addRole() {

}

function addDepartment(){

}


//update functions 
function updateEmployeeRole() {

}

//delete functions 
function deleteEmployee() {

}

    

promptQuestions(); 