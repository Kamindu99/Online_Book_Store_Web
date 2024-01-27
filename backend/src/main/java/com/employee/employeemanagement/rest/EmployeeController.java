package com.employee.employeemanagement.rest;

import com.employee.employeemanagement.dto.EmployeeDto;
import com.employee.employeemanagement.model.Employee;
import com.employee.employeemanagement.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @PostMapping("/create")
    public ResponseEntity<Employee> createEmployee(@RequestBody EmployeeDto employeeDto) throws Exception {
        ResponseEntity response = employeeService.createEmployee(employeeDto);
        return response;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployee() throws Exception {
        ResponseEntity response = employeeService.getAllEmployee();
        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Integer id) throws Exception {
        ResponseEntity response = employeeService.getEmployeeById(id);
        return response;
    }

    @GetMapping("/get-by-name")
    public ResponseEntity<Employee> getEmployeeByName(@RequestParam String firstName) throws Exception {
        ResponseEntity response = employeeService.getEmployeeByName(firstName);
        return response;
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Employee> updateEmployee(@RequestBody EmployeeDto employeeDto) throws Exception {
        ResponseEntity response = employeeService.updateEmployee(employeeDto);
        return response;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEmployeeById(@PathVariable Integer id) throws Exception {
        ResponseEntity response = employeeService.deleteEmployeeById(id);
        return response;
    }
}
