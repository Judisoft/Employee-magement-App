
    const express = require('express');
    const router = express.Router();
    const {getAllEmployees, 
            getSingleEmployee, 
            createEmployee, 
            updateEmployee, 
            deleteEmployee} = require('../controllers/employeeController');

    

    router.get('/api/v1/employees', getAllEmployees);
    router.get('/api/v1/employees/:id', getSingleEmployee);
    router.post('/api/v1/employees', createEmployee);
    router.put('/api/v1/employees/:id', updateEmployee);
    router.delete('/api/v1/employees/:id', deleteEmployee);

module.exports = router;