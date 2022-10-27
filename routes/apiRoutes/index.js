const express = require('express');
const router = express.Router();

router.use(require('../apiRoutes/employeeAPI'));
router.use(require('../apiRoutes/departmentsAPI'));
router.use(require('../apiRoutes/rolesAPI')); 

module.export = index; 