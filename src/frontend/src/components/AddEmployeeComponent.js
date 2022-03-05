import React, { useEffect, useState } from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const AddEmployeeComponent = () => {

  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [emailId, setEmailId] = useState("");  
  const navigate = useNavigate();
  const id = useParams();
  const length = Object.keys(id).length;

  const saveorUpdateEmployee = (e) => {
    e.preventDefault();

    const employee = {firstName,lastName,emailId};

    if(length === 0){
        EmployeeService.createEmployee(employee).then(
            (res) => {
                console.log(res.data);
                navigate("/employees");
            }
        ).catch(err => {
            console.log(err);
        });
    }else{
        EmployeeService.updateEmployee(id.id,employee).then(
            (res) => {
                console.log(res.data);
                navigate("/employees");
            }
        ).catch(err => {
            console.log(err);
        })
    }
    

  }

  useEffect(() => {
    if(length > 0){
        EmployeeService.getEmployeeById(id).then(res  => {
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setEmailId(res.data.emailId);
        }).catch(err => {
            console.log(err);
        })
    }
  },[])

  const title = () => {
    if(length > 0){
        return <h2 className='text-center'>Update Employee</h2>
    }else{
        return <h2 className='text-center'>Add Employee</h2>
    }
  }

  return (
    <div>
        <br></br>
        <br></br>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    {
                        title()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name</label>
                                <input type="text" 
                                       placeholder='Enter first name' 
                                       name = "firstName" 
                                       className='form-control'
                                       value={firstName}
                                       onChange={e => setFirstName(e.target.value)}>
                                           
                                </input>
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name</label>
                                <input type="text" 
                                       placeholder='Enter last name' 
                                       name = "lastName" 
                                       className='form-control'
                                       value={lastName}
                                       onChange={e => setLastName(e.target.value)}>
                                           
                                </input>
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email ID</label>
                                <input type="text" 
                                       placeholder='Enter email ID' 
                                       name = "email ID" 
                                       className='form-control'
                                       value={emailId}
                                       onChange={e => setEmailId(e.target.value)}>
                                           
                                </input>
                            </div>

                            <button className='btn btn-success' onClick={(e) => saveorUpdateEmployee(e)}> 
                                Submit
                             </button>
                             <Link to="/employees" className='btn btn-danger'>Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default AddEmployeeComponent