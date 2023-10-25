const Department = require('../models/Department');

const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find({});
        if(!departments) {
            return res.status(404).json({"data": []})
        }
        res.status(200).json(departments);
    } catch (error) {
        res.status(404).json({"error": "Sorry!, Something went wrong!"});
    }
}

const getSingleDepartment = async (req, res) => {
    try {
        const departmentId = req.params.id;
        const department = await Department.findOne({_id: departmentId}).exec();
        if(!department) {
            return res.status(404).json({"error": "Department not found!"});
        }
        res.status(200).json({department});
    } catch (error) {
        res.status(400).json({"error": "Something went wrong!"})
    }
}

const createDepartment = async (req, res) => {
    try {
        const department = await Department.create(req.body);
        res.status(201).json({department});
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

const updateDepartment = async (req, res) => {
    try {
        const departmentId = req.params.id;
        const department = await Department.findOneAndUpdate({_id:departmentId}, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({department});
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

const deleteDepartment = async (req, res) => {
    try {
        const departmentId = req.params.id;
        const department = await Department.findOneAndDelete({_id:departmentId});
        if(!department) {
            return res.status(404).json({"error": "Department not found"});
        }
        res.status(200).json({"message": "Department deleted successfully"})
    } catch (error) {
        res.status(500).json({"error": "Something went wrong!"});
    }
}

module.exports = {getAllDepartments, createDepartment, getSingleDepartment, updateDepartment, deleteDepartment};