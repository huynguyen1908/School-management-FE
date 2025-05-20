import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { Assignment } from '../../models/assignment';
import { TeacherService } from '../../service/teacher.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-detail',
  imports: [CommonModule],
  templateUrl: './teacher-detail.component.html',
  styleUrl: './teacher-detail.component.scss'
})
export class TeacherDetailComponent implements OnInit {
  teacherId: string = '';
  userId: string = '';

  teacher?: Teacher;
  assignments: Assignment[] = [];

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Ví dụ lấy teacherId từ route params
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.teacherId = params['id'];
        this.loadTeacherById(this.teacherId);
        this.loadAssignments(this.teacherId);
      }
      if (params['userId']) {
        this.userId = params['userId'];
        this.loadTeacherByUserId(this.userId);
      }
    });
  }

  loadTeacherById(id: string) {
    this.teacherService.getTeacherById(id).subscribe({
      next: (data) => this.teacher = data,
      error: (err) => console.error('Error loading teacher by id', err)
    });
  }

  loadAssignments(id: string) {
    this.teacherService.getTeacherAssignments(id).subscribe({
      next: (data) => this.assignments = data,
      error: (err) => console.error('Error loading assignments', err)
    });
  }

  loadTeacherByUserId(userId: string) {
    this.teacherService.getTeacherByUserId(userId).subscribe({
      next: (data) => this.teacher = data,
      error: (err) => console.error('Error loading teacher by userId', err)
    });
  }
}