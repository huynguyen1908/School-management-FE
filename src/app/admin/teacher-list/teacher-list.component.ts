import { Component } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { TeacherService } from '../../service/teacher.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-list',
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.scss'
})
export class TeacherListComponent {
  displayedColumns: string[] = ['teacherId', 'name', 'subject', 'isHomeroom', 'dateOfBirth', 'gender', 'email', 'actions'];
  teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers(): void {
    this.teacherService.getTeacherList().subscribe({
      next: (data) => this.teachers = data,
      error: (err) => console.error('Error fetching teachers', err)
    });
  }
}
