import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Parent } from '../../models/parent';
import { Student } from '../../models/student';

import { CommonModule, DatePipe } from '@angular/common';
import { StudentService } from '../../service/student.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-student-detail',
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink, DatePipe, HttpClientModule],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent {
  student: Student | null = null;
  parent: Parent | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId) {
      this.loadStudent(studentId);
      this.loadParent(studentId);
    }
  }

  loadStudent(id: string) {
    this.studentService.getStudentById(id).subscribe(
      (data: Student) => {
        this.student = data;
      },
      (error: any) => {
        console.error('Error fetching student:', error);
      }
    );
  }

  loadParent(studentId: string) {
    this.studentService.getParentFromStudent(studentId).subscribe(
      (data: Parent) => {
        this.parent = data;
      },
      (error: any) => {
        console.error('Error fetching parent:', error);
      }
    );
  }

  back(studentId: string) {
    
    const role = localStorage.getItem('role');  // Hoặc lấy từ AuthService

    if (role === 'ADMIN') {
      this.router.navigate(['/admin/students']);
      } else if (role === 'STUDENT') {
        this.router.navigate(['student/detail', studentId]);
      }
    }
}
