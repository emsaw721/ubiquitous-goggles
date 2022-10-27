DROP TABLE IF EXISTS employee; 
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;  

CREATE TABLE employee (
    id INTEGER PRIMARY KEY, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER
); 

CREATE TABLE department (
    id  INTEGER PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INTEGER PRIMARY KEY, 
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER
);
