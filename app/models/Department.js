const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name of department can not be empty'],
        trim: true,
        unique: [true, 'Department already exists'],
        maxlength: [30, 'Name can not be more than 20 characters']
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Department', DepartmentSchema);