package com.employee.employeemanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {
    private Integer empId;
    private String firstName;
    private String lastName;
    private String dob;
    private String position;
    private String userName;
    private String password;
}
