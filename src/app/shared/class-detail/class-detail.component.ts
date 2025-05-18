import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { ClassService } from '../../service/class.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-class-detail',
  standalone: true,
  imports: [FormsModule,
  ReactiveFormsModule,
  MatTableModule,
  CommonModule,
  MatCardTitle,
  MatFormFieldModule,
  MatTableModule,
  MatCardModule,
  MatInputModule,
  MatAutocompleteModule, 
  MatIconModule],
  templateUrl: './class-detail.component.html',
  styleUrl: './class-detail.component.scss'
})
export class ClassDetailComponent implements OnInit {
  classId!: string;
  students: Student[] = [];
  filteredStudents: Student[] = [];
  studentSearchControl = new FormControl('');
  newStudentId: string = '';

  constructor(
    private route: ActivatedRoute,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    this.classId = this.route.snapshot.paramMap.get('id')!;
    this.loadStudents();

    this.studentSearchControl.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      map(value => typeof value === 'string' ? value.toLowerCase() : ''),
      map(name =>
      this.students.filter(s =>
        (s.name ?? '').toLowerCase().includes(name)
      )
)

    ).subscribe(filtered => this.filteredStudents = filtered);
  }

  displayFn(student: Student): string {
    return student && student.name ? student.name : '';
  }

  onStudentSelected(student: Student): void {
    this.newStudentId = student.studentId;
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
