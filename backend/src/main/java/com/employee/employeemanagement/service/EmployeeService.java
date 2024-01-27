package com.employee.employeemanagement.service;

import com.employee.employeemanagement.dao.EmployeeDao;
import com.employee.employeemanagement.dto.EmployeeDto;
import com.employee.employeemanagement.model.Employee;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class EmployeeService {
    @Autowired
    EmployeeDao employeeDao;

    public ResponseEntity createEmployee(EmployeeDto employeeDto) throws Exception {
        try{
            Employee employee = new Employee();
            employee.setFirstName(employeeDto.getFirstName());
            employee.setLastName(employeeDto.getLastName());
            employee.setDob(employeeDto.getDob());
            employee.setPosition(employeeDto.getPosition());
            employee.setUserName(employeeDto.getUserName());
            employee.setPassword(employeeDto.getPassword());

            Employee savedEmployee = employeeDao.save(employee);

            if (savedEmployee==null){
                throw new Exception("Error saving");
            }
            else {
                return ResponseEntity.ok(savedEmployee);
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            throw new Exception(e.getMessage());
        }
    }

    public ResponseEntity getAllEmployee() throws Exception {
        try{
            List<Employee> employeeList = new ArrayList<>();
            employeeList = employeeDao.findAll();

            return ResponseEntity.ok(employeeList);
        }
        catch (Exception e){
            log.error(e.getMessage());
            throw new Exception(e.getMessage());
        }
    }

    public ResponseEntity getEmployeeById(Integer id) throws Exception {
        try{
            Optional<Employee> optionalEmployee = employeeDao.findById(id);
            if(optionalEmployee.isPresent()){
                Employee employee = optionalEmployee.get();
                return ResponseEntity.ok(employee);
            }
            else{
                throw new Exception("Data not found for given id");
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            throw new Exception(e.getMessage());
        }
    }

    public ResponseEntity getEmployeeByName(String firstName) throws Exception {
        try{
            Optional<Employee> optionalEmployee = employeeDao.findByFirstName(firstName);
            if(optionalEmployee.isPresent()){
                Employee employee = optionalEmployee.get();
                return ResponseEntity.ok(employee);
            }
            else{
                throw new Exception("Data not found for given id");
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            throw new Exception(e.getMessage());
        }
    }

    public ResponseEntity updateEmployee(EmployeeDto employeeDto) throws Exception {
        try{
            if(employeeDto.getEmpId()==null){
                throw new Exception("Employee id not found");
            }
            Optional<Employee> optionalEmployee = employeeDao.findById(employeeDto.getEmpId());

            if(optionalEmployee.isPresent()){
                Employee employee = optionalEmployee.get();
                employee.setFirstName(employeeDto.getFirstName());
                employee.setLastName(employeeDto.getLastName());
                employee.setDob(employeeDto.getDob());
                employee.setPosition(employeeDto.getPosition());
                employee.setUserName(employeeDto.getUserName());
                employee.setPassword(employeeDto.getPassword());

                Employee updatedEmployee = employeeDao.save(employee);

                if(updatedEmployee==null){
                    throw new Exception("Error Saving");
                }
                else{
                    return ResponseEntity.ok(employee);
                }
            }
            else{
                throw new Exception("Data not found for given id");
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            throw new Exception(e.getMessage());
        }
    }

    public ResponseEntity deleteEmployeeById(Integer id) throws Exception {
        try{
            Optional<Employee> optionalEmployee = employeeDao.findById(id);
            if(optionalEmployee.isPresent()){
                employeeDao.deleteById(id);
                return ResponseEntity.ok("Delete Success");
            }
            else{
                throw new Exception("Data not found for given id");
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            throw new Exception(e.getMessage());
        }
    }
}
