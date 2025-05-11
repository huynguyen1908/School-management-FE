import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { ClassService } from '../../service/class.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-class-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './class-detail.component.html',
  styleUrl: './class-detail.component.scss'
})
export class ClassDetailComponent implements OnInit {
  classId!: string;
  students: Student[] = [];
  newStudentId: string = '';

  constructor(
    private route: ActivatedRoute,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    this.classId = this.route.snapshot.paramMap.get('id')!;
    this.loadStudents();
  }

  loadStudents() {
    this.classService.getStudentsOfClass(this.classId).subscribe({
      next: (data) => this.students = data,
      error: (err) => console.error('Error loading students', err)
    });
  }

  addStudent() {
    if (!this.newStudentId) return;

    this.classService.addStudentToClass(this.classId, this.newStudentId).subscribe({
      next: () => {
        this.newStudentId = '';
        this.loadStudents();
      },
      error: (err) => console.error('Error adding student', err)
    });
  }
}
