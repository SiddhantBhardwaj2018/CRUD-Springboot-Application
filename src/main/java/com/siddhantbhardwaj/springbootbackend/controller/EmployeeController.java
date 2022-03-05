package com.siddhantbhardwaj.springbootbackend.controller;

import com.siddhantbhardwaj.springbootbackend.exception.ResourceNotFoundException;
import com.siddhantbhardwaj.springbootbackend.model.Employee;
import com.siddhantbhardwaj.springbootbackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee){
        return employeeRepository.save(employee);
    }

    @GetMapping("{Id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable long Id){
        Employee employee = employeeRepository.findById(Id).orElseThrow(() -> {
            return new ResourceNotFoundException("Employee does not exist with this id " + Id);
        });
        return ResponseEntity.ok(employee);
    }

    @PutMapping("{Id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable long Id, @RequestBody Employee employeeDetails){
        Employee updateEmployee = employeeRepository.findById(Id).orElseThrow(() -> {
            return new ResourceNotFoundException("Employee not found with Id");
        });
        updateEmployee.setFirstName(employeeDetails.getFirstName());
        updateEmployee.setLastName(employeeDetails.getLastName());
        updateEmployee.setEmailId(employeeDetails.getEmailId());

        employeeRepository.save(updateEmployee);

        return ResponseEntity.ok(updateEmployee);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable long id){
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> {
            return new ResourceNotFoundException("Employee does not exist with this id " + id);
        });
        employeeRepository.delete(employee);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
