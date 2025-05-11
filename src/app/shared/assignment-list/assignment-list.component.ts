import { Component, Input } from '@angular/core';
import { Assignment } from '../../models/assignment';
import { StudyService } from '../../service/study.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../service/student.service';
import { TeacherService } from '../../service/teacher.service';
import { Teacher } from '../../models/teacher';

@Component({
  selector: 'app-assignment-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule],
  templateUrl: './assignment-list.component.html',
  styleUrl: './assignment-list.component.scss'
})
export class AssignmentListComponent {
  @Input() role: 'student' | 'teacher' = 'student';
  @Input() userId!: string;

  assignments: Assignment[] = [];
  studentId: string = '';
  teacherId: string = '';

  constructor(
    private studyService: StudyService,
    private studentService: StudentService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    const userId = this.userId || localStorage.getItem('userId') || '';
    if (!userId) {
      console.error('userId is not provided');
      return;
    }
    console.log('Fetching assignments for userId:', userId, 'role:', this.role); // Debug

    if (this.role === 'student') {
      this.studentService.getStudentByUserId(userId).subscribe({
        next: (student) => {
          if (!student || !student.studentId) {
            console.error('No student or studentId found for userId:', userId);
            return;
          }
          this.studentId = student.studentId;
          this.getAssignmentsOfStudent();
        },
        error: (err) => console.error('Error fetching student:', err)
      });
    // } else if (this.role === 'teacher') {
    //   this.teacherService.getTeacherByUserId(userId).subscribe({
    //     next: (teacher) => {
    //       if (!teacher || !teacher.teacherId) {
    //         console.error('No teacher or teacherId found for userId:', userId);
    //         return;
    //       }
    //       this.teacherId = teacher.teacherId;
    //       this.getAssignmentsOfTeacher();
    //     },
    //     error: (err) => console.error('Error fetching teacher:', err)
    //   });
    }
  }

  getAssignmentsOfStudent(): void {
    if (!this.studentId) {
      console.error('studentId is not provided');
      return;
    }
    this.studyService.getAssignmentsOfStudent(this.studentId).subscribe({
      next: (data) => {
        console.log('Student assignments:', data); // Debug
        this.assignments = data;
      },
      error: (err) => console.error('Error fetching student assignments:', err)
    });
  }

  // getAssignmentsOfTeacher(): void {
  //   if (!this.teacherId) {
  //     console.error('teacherId is not provided');
  //     return;
  //   }
  //   this.studyService.getAssignmentsOfTeacher(this.teacherId).subscribe({
  //     next: (data) => {
  //       console.log('Teacher assignments:', data); // Debug
  //       this.assignments = data;
  //     },
  //     error: (err) => console.error('Error fetching teacher assignments:', err)
  //   });
  // }
}
