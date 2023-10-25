const addMemberForm = document.getElementById("addMemberForm");
const updateEmployeeForm = document.getElementById("updateEmployeeForm")
const createDepartmentForm = document.getElementById("createDepartmentForm");
const tableData = document.getElementById("data");
const loader = document.getElementById("loader");
const deleteBtn = document.getElementById("deleteBtn");
const dept = document.getElementById("dept");
const departmentOpts = document.getElementById("employeeDepartment");

const fetchDepartments = async () => {
    try {
        const res = await axios.get("http://localhost:5000/api/v1/departments");
        const data = res.data;
        data.forEach(department => {
            const option = document.createElement("option");
            option.value = department.name.toLowerCase();
            option.textContent = department.name
            dept.appendChild(option);
        })
    } catch (error) {
        // setTimeout(fetchDepartments, 5000);
        console.log(error.message)
    }
}

fetchDepartments();


const createEmployee = async (data) => {
    try {
        const employeeData = {
            name: data[0].name,
            surname: data[1].surname,
            email: data[2].email,
            department: data[3].department
        }
        const res = await axios.post('http://localhost:5000/api/v1/employees', employeeData);
        alert('Employee added successfully');
        location.reload();
    } catch (err) {
        const ers = err.response.data.errors;
        let html = '<ul>';
        for(let key in ers) {
            html += `<li>${ers[key]}</li>`
        }
        html += '</ul>'

        document.getElementById('validationErrors').innerHTML = html;
    }
    
}

addMemberForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = [...e.currentTarget.elements]
            .filter(element => element.type !== 'submit')
            .map(elmt => {
                return {
                    [elmt.getAttribute("name")]: elmt.type === "file" ? elmt.file : elmt.value
                };
            });
    createEmployee(data);
});

// Delete Department

const deleteDepartment = async (departmentId) => {
    try {
        confirm('Are you sure to delete this department?')
        res = await axios.delete(`http://localhost:5000/api/v1/departments/${departmentId}`);
        alert('Department deleted successfully');
        location.reload();
    } catch (error) {
        alert('Something went wrong');
    }
}

// Get Departments

const getDepartments = async () => {
    try {
        const departments = document.getElementById("dep");
        departments.innerHTML = '';
        const res = await axios.get("http://localhost:5000/api/v1/departments");
        const data = res.data;
        if(data.length === 0) {
            departments.innerHTML = 'No department'
        }
        data.map(item => {
            departments.innerHTML += `<ul>
                                        <li><a href="#" class="px-3">${item.name}</a> 
                                        <a href="#"><small class="text-danger" onclick="deleteDepartment('${item._id}')">[remove]</small></a></li>
                                    </ul>`
        });

    } catch (error) {
        console.log(error)
    }
}

getDepartments();


// Create department
const postDepartment = async (department) => {
    try {
        const data = {
            name: department
        };
        console.log(data);
        const res = await axios.post('http://localhost:5000/api/v1/departments', data);
        alert('Department Created successfully');
        location.reload();
    } catch (error) {
        // alert('Something went wrong', error.message);
        console.log(error)
    }
}

createDepartmentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const departmentName = document.getElementById("departmentName").value;
    postDepartment(departmentName);
});

// get Team Members

const getEmployees = async () => {
    try {
        loader.innerHTML = 'Fetching Employees...';
        const res = await axios.get('http://localhost:5000/api/v1/employees');
        const employees = res.data;
        if(employees.length === 0) {
            tableData.innerHTML = 'No Employee found';
        }
            employees.map((employee, index) => {
                tableData.innerHTML += `<tr>
                                            <td>${index + 1}</td>
                                            <td>${employee.name}</td>
                                            <td>${employee.surname}</td>
                                            <td>${employee.email}</td>
                                            <td>${employee.department}</td>
                                            <td>
                                                <a onclick="getEmployeeInfo('${employee._id}')" class="btn btn-sm btn-primary px-3" data-bs-toggle="modal" data-bs-target="#editEmployee">Edit</a>
                                                <a onclick="getEmployeeInfo('${employee._id}')" class="btn btn-sm btn-danger px-3 my-1" data-bs-toggle="modal" data-bs-target="#deleteEmployee">Delete</a>
                                            </td>
                                        </tr>`
            });
            loader.style.display = 'none';
    } catch (error) {
        // setTimeout(getEmployees, 5000);
        alert(error.message);
    }
    
}

getEmployees();


const getEmployeeInfo = async (employeeId) => {
    try {
        const id = document.getElementById("id");
        const name = document.getElementById("name");
        const surname = document.getElementById("surname");
        const email = document.getElementById("email");
        const department = document.getElementById("department");

        const res = await axios.get(`http://localhost:5000/api/v1/employees/${employeeId}`);
        const employee = res.data.employee;
        id.value = employeeId;
        name.value = employee.name;
        surname.value = employee.surname;
        email.value = employee.email;

        const response = await axios.get("http://localhost:5000/api/v1/departments");
        const data = response.data;
        data.forEach(department => {
            const option = document.createElement("option");
            option.value = department.name;
            option.textContent = department.name
            departmentOpts.appendChild(option);
        })
    } catch (error) {
        console.log(error.message);
    }
}

// Update Employee

const updateEmployee = async (data) => {
    console.log(data)

    try {
        const employeeData = {
            name: data[1].name,
            surname: data[2].surname,
            email: data[3].email,
            department: data[4].department
        }

        const res = await axios.put(`http://localhost:5000/api/v1/employees/${data[0].id}`, employeeData);
        alert('User updated');
        location.reload()
    } catch (err) {
        const ers = err.response.data.errors;
        let html = '<ul>';
        for(let key in ers) {
            html += `<li>${ers[key]}</li>`
        }
        html += '</ul>'

        document.getElementById('validationUpdateErrors').innerHTML = html;
    }
}

updateEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = [...e.currentTarget.elements]
            .filter(element => element.type !== 'submit')
            .map(elmt => {
                return {
                    [elmt.getAttribute("name")]: elmt.type === "file" ? elmt.file : elmt.value
                };
            });
    updateEmployee(data);
})

// Delete Employee

deleteBtn.addEventListener("click", async (e) => {
    try {
        const id = document.getElementById("id").value;
        res = await axios.delete(`http://localhost:5000/api/v1/employees/${id}`);
        alert('User deleted successfully');
        location.reload();
    } catch (error) {
        alert('Something went wrong. Try again!');
    }
    
})

