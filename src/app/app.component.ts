import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'emp-crud';
  employees: Employee[] = [];
  employee: Employee = new Employee();
  isEdit = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  saveEmployee() {
    if (this.isEdit) {
      this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(data => {
        this.loadEmployees();
        this.resetForm();
      });
    } else {
      this.employeeService.createEmployee(this.employee).subscribe(data => {
        this.loadEmployees();
        this.resetForm();
      });
    }
  }

  editEmployee(employee: Employee) {
    this.employee = { ...employee };
    this.isEdit = true;
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(data => {
      this.loadEmployees();
    });
  }

  resetForm() {
    this.employee = new Employee();
    this.isEdit = false;
  }
}




