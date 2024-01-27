package com.employee.employeemanagement.dao;


import com.employee.employeemanagement.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeDao extends JpaRepository<Employee,Integer> {
    Optional<Employee> findByFirstName(String firstName);
}
