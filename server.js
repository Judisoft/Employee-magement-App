const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const port = process.env.PORT;
const url = process.env.MONGODB_URI;
const connectDB = require('./app/db/dbconnect');

const app = express();
app.use(cors());

// parse request of content-type - application/json
app.use(express.json());

// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// Routers
const employeeRoute = require('./app/routes/employees');
const departmentRoute = require('./app/routes/departments');

app.use('/', employeeRoute);
app.use('/', departmentRoute);

const start = async () => {
    try {
        await connectDB(url);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}...`)
        });
    } catch (error) {
        console.log(error)
    }
}

start();