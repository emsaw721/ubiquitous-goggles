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
                choices: ['View All Employees', 'View Employees By Manager', 'View Employees By Department', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'View All Roles', 'Add Role', 'Remove Role', 'View All Departments', 'Add Department', 'Remove Department', 'View Department Budget', 'Quit']
            }
        ])
        .then(function (userInput) {
            switch (userInput.action) {
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'View Employees By Manager':
                    viewEmployeesByManager();
                    break;
                case 'View Employees By Department':
                    viewEmployeesByDepartment();
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
                case 'Update Employee Manager':
                    updateEmployeeManager();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Remove Role':
                    removeRole();
                    break;
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Remove Department':
                    removeDepartment();
                    break;
                case 'View Department Budget':
                    viewTotalDepartmentBudget();
                    break;
                case 'Quit':
                    endEdit();
                    break;
            }
        })
}
// all views like this basically 
// add view employees by manager and view employees by department for extra credit 
// add view total budget (combined employee salary) by department for extra credit 
function viewEmployees() {
    connect.query(`SELECT * FROM employee`, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results);
        promptQuestions();
    })
}

// get manager id and reference it with employee manager_id inner join 
function viewEmployeesByManager() {
    connect.query(`SELECT * FROM manager`, (err, results) => {
        if (err) throw err
        let managerList = results.map((managers) => {
            return {
                name: `${managers.first_name} ${managers.last_name}`,
                value: managers.id
            }
        })
        chooseManager(managerList);
    })

    function chooseManager(managerList) {
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Choose a manager to see the employee list.',
                    choices: managerList
                }
            ]).then((selectedManager) => {
                let managerID = selectedManager.manager_id
                connect.query(`SELECT first_name, last_name FROM employee WHERE manager_id = ${managerID}`, (err, results) => {
                    if (err) throw err
                    console.table(results)
                    promptQuestions();

                })
            }
            )
    }
}

function viewEmployeesByDepartment() {
    connect.query(`SELECT * FROM department`, (err, results) => {
        if (err) throw err
        let departmentList = results.map((departments) => {
            return {
                name: departments.names,
                value: departments.id
            }
        })
        selectDepartment(departmentList);
    })
    function selectDepartment(departmentList) {
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Choose a manager to see the employee list.',
                    choices: departmentList
                }
            ]).then((departmentChoice) => {
                let departmentId = departmentChoice.department_id
                connect.query(`SELECT employee.first_name, employee.last_name, employee.id FROM employee INNER JOIN role ON employee.id=role.id `, (err, results) => {
                    if (err) throw err
                    console.table(results)
                    promptQuestions();

                })
            }
            )
    }
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
            addEmployeeRole(person)
        })

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
                    addEmployeeManager(employeeNameRole)
                })
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
            if (err) throw err

            console.log(`${employeeFacts.first_name} ${employeeFacts.last_name} added to database.`)
            promptQuestions();
        })
    }
}

function addRole() {

    return inquirer
        .prompt([
            {
                type: 'text',
                name: 'title',
                message: 'What is the title of the role?',
            },
            {
                type: 'text',
                name: 'salary',
                message: 'What is the salary of the role?'
            }
        ]).then((nameSalary) => {
            addRoleDepartment(nameSalary)
        })

    function addRoleDepartment(nameSalary) {
        let roleNameSalary = nameSalary;
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

        function chooseDepartment(departmentInfo) {
            return inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'department_id',
                        message: 'Which department does the role belong to?',
                        choices: departmentInfo
                    }
                ]).then((department) => {
                    let newDepartment = department;
                    let newRoleInfo = Object.assign(roleNameSalary, newDepartment)
                    console.log(newRoleInfo)
                    insertRole(newRoleInfo)
                })
        }

        function insertRole(newRoleInfo) {
            connect.query(`INSERT INTO roles(title, salary, department_id) VALUES('${newRoleInfo.title}', '${newRoleInfo.salary}', '${newRoleInfo.department_id}')`, (err, result) => {
                if (err) throw err
                console.log(`${newRoleInfo.title} added to database.`);
                promptQuestions();
            })
        }
    }
}

function addDepartment() {
    return inquirer
        .prompt([
            {
                type: 'text',
                name: 'names',
                message: 'What is the department called?'
            }
        ]).then((department) => {
            console.log(department)
            connect.query(`INSERT INTO department(names) VALUES('${department.names}')`, (err, result) => {
                if (err) throw err
                console.log(`${department.names} added to departments.`)
            })
            promptQuestions();
        })
}


//delete functions 
function removeEmployee() {
    connect.query(`SELECT * FROM employee`, (err, results) => {
        if (err) throw err;
        let employeeList = results.map((employees) => {
            return {
                name: `${employees.first_name} ${employees.last_name}`,
                value: employees.id
            }
        })
        deleteEmployee(employeeList);

    })
    function deleteEmployee(employeeList) {
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'removeEmployee',
                    message: 'Which employee would you like to remove?',
                    choices: employeeList
                }
            ]).then((removedEmployee) => {
                console.log(removedEmployee)
                let employeeID = removedEmployee.removeEmployee
                console.log(employeeID)

                connect.query(`DELETE FROM employee WHERE id = ${employeeID};`, (err, result) => {
                    if (err) throw err
                    console.log(`Employee has been removed from database.`)
                })
                promptQuestions();
            })
    }
}

function removeDepartment() {
    connect.query(`SELECT * FROM department`, (err, results) => {
        if (err) throw err;
        let departmentList = results.map((departments) => {
            return {
                name: departments.names,
                value: departments.id
            }
        })
        deleteDepartment(departmentList)
    })

    function deleteDepartment(departmentList) {
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'removeDepartment',
                    message: 'Which department would you like to remove?',
                    choices: departmentList
                }
            ]).then((removedDepartment) => {
                console.log(removedDepartment)
                let departmentID = removedDepartment.removeDepartment
                console.log(departmentID)

                connect.query(`DELETE FROM department WHERE id= ${departmentID}`, (err, results) => {
                    if (err) throw err
                    console.log(`Department has been removed from database.`)
                })
            })
    }
}

function removeRole() {
    connect.query(`SELECT * FROM roles`, (err, results) => {
        if (err) throw err;
        let rolesList = results.map((roles) => {
            return {
                name: roles.title,
                value: roles.id
            }
        })
        deleteRole(rolesList)
    })
    function deleteRole(rolesList) {
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'removeRole',
                    message: 'Which role would you like to remove?',
                    choices: rolesList
                }
            ]).then((removedRole) => {
                console.log(removedRole)
                let roleID = removedRole.removeRole
                console.log(roleID)

                connect.query(`DELETE FROM roles WHERE id = ${roleID}`, (err, results) => {
                    if (err) throw err
                    console.log(`Role has been removed from database.`)
                })
            })
    }

}

//update functions 
function updateEmployeeRole() {

    connect.query(`SELECT * FROM employee`, (err, results) => {
        if (err) throw err;
        let employeeList = results.map((employees) => {
            return {
                name: `${employees.first_name} ${employees.last_name}`,
                value: employees.id
            }
        })
        roleEmployeeList(employeeList);
    })

    function roleEmployeeList(employeeList) {
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'id',
                    message: "Which employee's role do you want to update?",
                    choices: employeeList
                }
            ]).then((chosenEmployee) => {
                chooseNewRole(chosenEmployee)
            })
    }

    function chooseNewRole(chosenEmployee) {
        let newRoleEmployee = chosenEmployee;
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
            updateRoleEmployeeRole(roleInfo);
        })

        function updateRoleEmployeeRole(roleInfo) {
            return inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'role_id',
                        message: "What is the employee's new role?",
                        choices: roleInfo
                    }
                ]).then((updatedRole) => {
                    let newRole = Object.assign(newRoleEmployee, updatedRole)
                    console.log(newRole)
                    connect.query(`UPDATE employee SET role_id = '${newRole.role_id}' WHERE id = '${newRole.id}';`, (err, result) => {
                        if (err) throw err
                        console.log(`Employee role has been updated`)
                    })
                    promptQuestions();
                })
        }

    }
}

function updateEmployeeManager() {

    connect.query(`SELECT * FROM employee`, (err, results) => {
        if (err) throw err;
        let employeeList = results.map((employee) => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }
        })
        managerEmployeeList(employeeList);
    })

    function managerEmployeeList(employeeList) {
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'id',
                    message: "Which employee's role do you want to update?",
                    choices: employeeList
                }
            ]).then((employeeSelected) => { chooseNewManager(employeeSelected) })
    }

    function chooseNewManager(employeeSelected) {
        let chosenEmployee = employeeSelected;
        console.log(chosenEmployee)
        connect.query(`SELECT * FROM manager`, (err, results) => {
            if (err) {
                console.log(err)
            }

            let managerInfo = results.map((manager) => {
                return {
                    name: `${manager.first_name} ${manager.last_name}`,
                    value: manager.id
                }
            })
            updateManagerEmployeeManager(managerInfo);
        })

        function updateManagerEmployeeManager(managerInfo) {
            console.log(managerInfo)
            return inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'manager_id',
                        message: "What is the employee's new manager?",
                        choices: managerInfo
                    }
                ]).then((updatedManager) => {
                    console.log(updatedManager)
                    let newManager = Object.assign(chosenEmployee, updatedManager)
                    console.log(newManager)
                    connect.query(`UPDATE employee SET manager_id = '${newManager.manager_id}' WHERE id = '${newManager.id}';`, (err, result) => {
                        if (err) throw err

                        console.log(`The employee's manger has been updated.`)
                    })
                    promptQuestions();
                })
        }
    }
}

// get salary from roles but cross reference it with employees 
function viewTotalDepartmentBudget() {
    //supposed to create a table that merges with existing department table --> department table + number of employees in it 
    connect.query(`SELECT * FROM department JOIN (SELECT department_id, COUNT(*) AS number_of_employees FROM roles GROUP BY department_id) department_info USING (department.id)`, (err, results) => {
        if (err) throw err
        console.table(results)
    })
}


// exit node 
function endEdit() {
    process.exit();
}

promptQuestions(); 