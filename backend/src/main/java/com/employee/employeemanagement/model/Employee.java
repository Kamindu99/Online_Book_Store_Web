package com.employee.employeemanagement.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="EMPLOYEE")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY,generator = "EMPLOYEE")
    @Column(name="empId")
    private Integer empId;

    @Column(name="firstName")
    private String firstName;

    @Column(name="lastName")
    private String lastName;

    @Column(name="dob")
    private String dob;

    @Column(name="position")
    private String position;

    @Column(name="userName")
    private String userName;

    @Column(name="password")
    private String password;
}
