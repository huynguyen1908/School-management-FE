import { Component, Input } from '@angular/core';
import { Assignment } from '../../models/assignment';
import { StudyService } from '../../service/study.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

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

  constructor(private studyService: StudyService) {}

  ngOnInit(): void {
    // Lấy userId từ localStorage nếu không được truyền qua @Input
    this.userId = this.userId || localStorage.getItem('userId') || '';
    if (!this.userId) {
      console.error('userId is not provided');
      return;
    }
    console.log('Fetching assignments for userId:', this.userId, 'role:', this.role); // Debug
    if (this.role === 'student') {
      this.getAssignmentsOfStudent();
    } else if (this.role === 'teacher') {
      this.getAssignmentsOfTeacher();
    }
  }

  getAssignmentsOfStudent(): void {
    this.studyService.getAssignmentsOfStudent(this.userId).subscribe({
      next: (data) => {
        console.log('Student assignments:', data); // Debug
        this.assignments = data;
      },
      error: (err) => console.error('Error fetching student assignments:', err)
    });
  }

  getAssignmentsOfTeacher(): void {
    this.studyService.getAssignmentsOfTeacher(this.userId).subscribe({
      next: (data) => {
        console.log('Teacher assignments:', data); // Debug
        this.assignments = data;
      },
      error: (err) => console.error('Error fetching teacher assignments:', err)
    });
  }
}
