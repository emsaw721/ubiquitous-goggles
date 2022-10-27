const express = require('express');
const db = require('./db/connection');
const apiEmployee = require('./routes/apiRoutes/Employee');
const apiRoles = require('./routes/apiRoutes/Roles');
const apiDepartments = require('./routes/apiRoutes/Departments'); 
const inquirer = require('inquirer');
const fs = require('fs'); 
const PORT = process.env.PORT || 3001;
const app = express();
// use this to print out data? but why do we need this?
require('console.table'); 

console.log(apiDepartments)// showing up at [class Departments] and I have no idea what that means 

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


promptQuestions(); 

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiEmployee);
app.use('/api', apiRoles);
app.use('/api', apiDepartments); 

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});


// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
