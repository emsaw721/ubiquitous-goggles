DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles; 
DROP TABLE IF EXISTS manager;
DROP TABLE IF EXISTS employee;  
 

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    names VARCHAR(30)
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES department (id)
); 

CREATE TABLE manager (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30) 
); 

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER, 
    FOREIGN KEY (role_id) REFERENCES roles (id), 
    FOREIGN KEY (manager_id) REFERENCES manager (id)
); 



