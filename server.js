const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');
const apiRoutes = require('./routes/apiRoutes');
const fs = require('fs'); 
const PORT = process.env.PORT || 3001;
const app = express();
require('console.table'); 

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

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
