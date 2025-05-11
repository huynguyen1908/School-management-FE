import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student';
import { StudentService } from '../../service/student.service';
import { StudentUpdateRequest } from '../../models/requests/student-update-request';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, MatOption, MatSelectModule,MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.scss'
})
export class StudentEditComponent {
  studentId!: string;
   student: Student = {
    studentId: '',
    name: '',
    gender: '',
    dateOfBirth: '',
    className: '',
    parentName: ''
  };
  
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id')!;
    this.studentService.getStudentById(this.studentId).subscribe(data => {
      this.student = data;
    });
  }

  save(): void {
    const formattedDate = this.formatDate(this.student.dateOfBirth);
    if (!formattedDate) {
      this.snackBar.open('Ngày sinh không hợp lệ. Vui lòng chọn ngày hợp lệ.', 'Đóng', { duration: 3000 });
      return;
    }
    const updateRequest: StudentUpdateRequest = {
      name: this.student.name,
      gender: this.student.gender,
      dateOfBirth: formattedDate,
    };
    this.studentService.editStudent(this.studentId, updateRequest).subscribe({
      next: () => {
        const role = localStorage.getItem('role');
        if (role === 'ADMIN') {
          this.router.navigate(['/admin/students']);
        } else {
          this.router.navigate(['/student/detail', this.studentId]);
        }
      },
      error: (err) => {
        console.error('Error updating student:', err);
        this.snackBar.open('Lỗi khi cập nhật thông tin. Vui lòng thử lại.', 'Đóng', { duration: 3000 });
      },
    });
  }

  cancel(): void {
    const role = localStorage.getItem('role');
    if (role === 'ADMIN') {
      this.router.navigate(['/admin/students']);
    } else {
      this.router.navigate(['/student/detail', this.studentId]);
    }
  }

  formatDate(date: any): string | null {
    if (!date) return null;
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
