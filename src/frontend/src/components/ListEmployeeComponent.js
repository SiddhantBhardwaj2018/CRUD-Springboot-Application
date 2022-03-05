import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const ListEmployeeComponent = () => {

  const [employees,setEmployees] = useState([]);

  let styles = {
      marginLeft: "10px"
  }

  useEffect(() => {
    getAllEmployees();
  },[])

  const getAllEmployees = () => {
    EmployeeService.getAllEmployees().then((response) => {
        setEmployees(response.data);
    }).catch(err => {
        console.log(err);
    })
  }

  const deleteEmployee = (id) => {
    EmployeeService.deleteEmployee(id).then(res => {
        console.log(res);
        getAllEmployees();
    }).catch(err => {
        console.log(err);
    })
  }

  return (
    <div className = "container">
        <h2 className='text-center'>List of Employees</h2>
        <Link to = "/add-employee" className='btn btn-primary mb-2'>Add Employee</Link>
        <table className='table table-bordered table-striped'>
            <thead>
                <tr>
                <th>Employee ID</th>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email ID</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(
                        employee => 
                        <tr key = {employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>   
                            <td>{employee.emailId}</td> 
                            <td>
                                <Link className='btn btn-info' to={`/edit-employee/${employee.id}`}>Update</Link>
                                <button className = "btn btn-danger" style={styles}  onClick = {() => deleteEmployee(employee.id)} 
                                >Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent