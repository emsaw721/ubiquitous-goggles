const express = require('express');
const router = express.Router();

router.use(require('./viewEmployees'));
router.use(require('./viewDepartments'));
router.use(require('./viewDepartments')); 

module.export = router; 