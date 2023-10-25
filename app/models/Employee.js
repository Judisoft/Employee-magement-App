const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name can not be empty'],
        trim: true,
        maxlength: [20, 'Name can not be more than 20 characters']
    },
    surname: {
        type: String,
        required: [true, 'Surename can not be empty'],
        trim: true,
        maxlength: [20, 'Surname can not be more than 20 characters']
    },
    email: {
        type: String,
        required: [true, 'Email can not be empty'],
        trim: true,
        unique: true,
        maxlength: [20, 'Surname can not be more than 20 characters'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    department: {
        type: String,
        required: [true, 'Department can not be empty']
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Employee', EmployeeSchema);