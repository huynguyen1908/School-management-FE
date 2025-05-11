import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Student } from '../../models/student';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent {
  displayedColumns: string[] = ['studentId', 'name', 'gender', 'dateOfBirth', 'className', 'parentName', 'actions'];
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(
      (data: Student[]) => {
        this.students = data;
      },
      (error: any) => {
        console.error('Error fetching students:', error);
      }
    );
  }
}
