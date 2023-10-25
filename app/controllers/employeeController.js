const Employee = require('../models/Employee');

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({});
        if(!employees) {
            return res.status(404).json({"data": []})
        }
        res.status(200).json(employees);
    } catch (error) {
        res.status(404).json({"error": "Sorry!, Something went wrong!"});
    }
}

const getSingleEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await Employee.findOne({_id: employeeId}).exec();
        if(!employee) {
            return res.status(404).json({"error": "Employee not found!"});
        }
        res.status(200).json({employee});
    } catch (error) {
        res.status(400).json({"error": "Something went wrong!"})
    }
}

const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json({employee});
    } catch (error) {
        if(error.name === 'ValidationError') {
            let errors = {};
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).send({errors});
        }
        res.status(500).send('Sorry! Something went wrong!')
    }
}

const updateEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await Employee.findOneAndUpdate({_id:employeeId}, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({employee});
    } catch (error) {
        if(error.name === 'ValidationError') {
            let errors = {};
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).send({errors});
        }
        res.status(500).send('Sorry! Something went wrong!');
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await Employee.findOneAndDelete({_id:employeeId});
        if(!employee) {
            return res.status(404).json({"error": "Employee not found"});
        }
        res.status(200).json({"message": "Employee deleted successfully"})
    } catch (error) {
        res.status(500).json({"error": "Something went wrong!"});
    }
}

module.exports = {getAllEmployees, createEmployee, getSingleEmployee, updateEmployee, deleteEmployee};