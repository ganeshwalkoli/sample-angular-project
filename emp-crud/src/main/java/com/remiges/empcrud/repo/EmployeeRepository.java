package com.remiges.empcrud.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.remiges.empcrud.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
