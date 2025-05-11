import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAccountService } from '../../service/user-account.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatButtonModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {
  accountForm: FormGroup;
  roles = ['PARENT', 'STUDENT', 'TEACHER', 'DEPARTMENT'];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.accountForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      parentId: [''],
      studentId: [''],
      teacherId: [''],
      departmentId: ['']
    });
  }

  onSubmit() {
    const role = this.accountForm.value.role;
    const payload: any = {
      username: this.accountForm.value.username,
      password: this.accountForm.value.password
    };

    let apiUrl = '';

    switch (role) {
      case 'PARENT':
        apiUrl = '/api/account/parent';
        payload.parentId = this.accountForm.value.parentId;
        break;
      case 'STUDENT':
        apiUrl = '/api/account/student';
        payload.studentId = this.accountForm.value.studentId;
        break;
      case 'TEACHER':
        apiUrl = '/api/account/teacher';
        payload.studentId = this.accountForm.value.teacherId; // theo backend của bạn
        break;
      case 'DEPARTMENT':
        apiUrl = '/api/account/department';
        payload.departmentId = this.accountForm.value.departmentId;
        payload.role = 'MANAGER'; // hoặc chọn role khác nếu cần
        break;
    }

    this.http.post(apiUrl, payload).subscribe({
      next: res => {
        alert('Tạo tài khoản thành công!');
        this.accountForm.reset();
      },
      error: err => {
        alert('Tạo tài khoản thất bại!');
        console.error(err);
      }
    });
  }

  showField(field: string): boolean {
    return this.accountForm.value.role === field;
  }
}