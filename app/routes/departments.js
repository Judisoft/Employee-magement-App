const express = require('express');
const router = express.Router()
const {getAllDepartments, 
    getSingleDepartment, 
    createDepartment, 
    updateDepartment, 
    deleteDepartment} = require('../controllers/departmentController');



router.get('/api/v1/departments', getAllDepartments);
router.get('/api/v1/departments/:id', getSingleDepartment);
router.post('/api/v1/departments', createDepartment);
router.put('/api/v1/departments/:id', updateDepartment);
router.delete('/api/v1/departments/:id', deleteDepartment);


module.exports = router;