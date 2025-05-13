import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../service/notification.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CreateNotificationRequest } from '../../models/requests/create-notification-request';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UserAccount } from '../../models/user-account';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-notification',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, 
    MatFormFieldModule, MatInputModule, 
    MatButtonModule, MatCardModule, 
    HttpClientModule, MatAutocompleteModule,
    MatOptionModule, MatSelectModule],
  templateUrl: './create-notification.component.html',
  styleUrl: './create-notification.component.scss'
})
export class CreateNotificationComponent {
  notificationForm: FormGroup;
  receiverCtrl = new FormControl('');
  errorMessage: string | undefined;
  successMessage: string | undefined;
  notificationFormSubmitted = false;

  mode: 'user' | 'role' = 'user';
  selectedReceiver: UserAccount | null = null;
  selectedRole: string | null = null;


  allUsers: UserAccount[] = [];
  filteredUsers: UserAccount[] = [];

  roles = ['STUDENT', 'PARENT', 'TEACHER', 'MANAGER', 'DEPARTMENT', 'ADMIN'];

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.notificationForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Giả lập API lấy tất cả người dùng
    this.fetchUsers();

    this.receiverCtrl.valueChanges.pipe(
      debounceTime(200),
      startWith(''),
      map(value => typeof value === 'string' ? value.toLowerCase() : ''),
      map(name => this.allUsers.filter(u => u.username.toLowerCase().includes(name)))
    ).subscribe(results => this.filteredUsers = results);
  }

  fetchUsers() {
    // Gọi API thực tế để lấy danh sách người dùng
    // this.userService.getAllUsers().subscribe(data => this.allUsers = data);
    this.allUsers = [];
  }

  onReceiverSelected(user: UserAccount) {
      this.selectedReceiver = user;
    }

  onSubmit(): void {
    this.notificationFormSubmitted = true;

    if (this.notificationForm.invalid) {
      return;
    }

    const currentUser = this.authService.getUserId();
    if (!currentUser) {
      this.errorMessage = 'Vui lòng đăng nhập để gửi thông báo';
      return;
    }

    if (this.mode === 'user' && !this.selectedReceiver) {
      this.errorMessage = 'Vui lòng chọn người nhận hợp lệ';
      return;
    }

    if (this.mode === 'role' && !this.selectedRole) {
      this.errorMessage = 'Vui lòng chọn vai trò người nhận';
      return;
    }

    const request: CreateNotificationRequest = {
      sender: currentUser,
      title: this.notificationForm.get('title')?.value,
      content: this.notificationForm.get('content')?.value,
      receiver: this.mode === 'user' ? this.selectedReceiver?.userId : undefined,
      receiverRole: this.mode === 'role' ? this.selectedRole ?? undefined : undefined
    };


    this.notificationService.createNotification(request).subscribe({
      next: () => {
        this.successMessage = 'Thông báo đã được gửi thành công!';
        this.notificationForm.reset();
        this.receiverCtrl.reset();
        this.selectedReceiver = null;
        this.selectedRole = null;
        this.notificationFormSubmitted = false;
        setTimeout(() => this.router.navigate(['/admin/notifications']), 2000);
      },
      error: (err) => {
        this.errorMessage = 'Lỗi khi gửi thông báo: ' + (err.error?.message || err.message);
      }
    });
  }
}