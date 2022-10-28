INSERT INTO employee
(id, first_name, last_name, role_id, manager_id)
VALUES 
('1', 'John', 'Doe', '1', null),
('2', 'Mike', 'Chan', '2', '1'),
('3', 'Ashley', 'Rodriguez', '3', null),
('4', 'Kevin', 'Tupik', '4', '3'),
('5', 'Kunal', 'Singh', '5', null),
('6', 'Malia', 'Brown', '6', '5'),
('7', 'Sarah', 'Lourd', '7', null),
('8', 'Tom', 'Allen', '8', '7'); 

INSERT INTO roles
(id, title, salary, department_id)
VALUES
('1', 'Sales Lead', '100000', '1'),
('2', 'Sales Associate', '80000', '1'),
('3', 'Cheif Engineer', '300000', '2'),
('4', 'Software Engineer', '150000', '2'),
('5', 'Account Manager', '160000', '3'),
('6', 'Accountant', '130000', '3'),
('7', 'Head of Legal', '250000', '4'),
('8', 'Lawyer', '200000', '4'); 

INSERT INTO department
(id, names)
VALUES
('1', 'Sales'),
('2', 'Engineering'),
('3', 'Finance'),
('4', 'Legal'); 