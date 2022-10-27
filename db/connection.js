
const mysql = require('mysql2');

const db = mysql.createConnection({
  // need to enter ip address to get it (database) to connect 
    host: '127.0.0.1',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: '',
    database: 'proletariat'
  });

  module.exports = db; 