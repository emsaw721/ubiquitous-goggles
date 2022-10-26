const inquirer = require('inquirer');
const fs = require('fs');


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
            case 'Update Enployee Role':
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

promptQuestions(); 