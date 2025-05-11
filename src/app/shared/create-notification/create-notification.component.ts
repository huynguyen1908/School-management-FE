import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../service/notification.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CreateNotificationRequest } from '../../models/requests/create-notification-request';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-create-notification',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './create-notification.component.html',
  styleUrl: './create-notification.component.scss'
})
export class CreateNotificationComponent {
  notificationForm: FormGroup;
  errorMessage: string | undefined;
  successMessage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.notificationForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      receiver: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.notificationForm.invalid) {
      return;
    }

    const currentUser = this.authService.getUserId();
    if (!currentUser) {
      this.errorMessage = 'Vui lòng đăng nhập để gửi thông báo';
      return;
    }

    const request: CreateNotificationRequest = {
      sender: currentUser,
      title: this.notificationForm.get('title')?.value,
      content: this.notificationForm.get('content')?.value,
      receiver: this.notificationForm.get('receiver')?.value
    };

    this.notificationService.createNotification(request).subscribe({
      next: () => {
        this.successMessage = 'Thông báo đã được gửi thành công!';
        this.notificationForm.reset();
        setTimeout(() => this.router.navigate(['/admin/notifications']), 2000);
      },
      error: (err) => {
        this.errorMessage = 'Lỗi khi gửi thông báo: ' + (err.error?.message || err.message);
      }
    });
  }
}