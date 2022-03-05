package com.siddhantbhardwaj.springbootbackend.repository;

import com.siddhantbhardwaj.springbootbackend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {



}
