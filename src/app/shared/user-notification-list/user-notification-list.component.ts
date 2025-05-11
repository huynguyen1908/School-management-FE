import { Component } from '@angular/core';
import { NotificationService } from '../../service/notification.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Notification } from '../../models/notification';

@Component({
  selector: 'app-user-notification-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, RouterLink],
  templateUrl: './user-notification-list.component.html',
  styleUrl: './user-notification-list.component.scss'
})
export class UserNotificationListComponent {
  displayedColumns: string[] = ['title', 'actions'];
  notifications: Notification[] = [];
  currentUserId: string | null = null;

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId();
    if (this.currentUserId) {
      this.loadUserNotifications(this.currentUserId);
    }
  }

  loadUserNotifications(userId: string): void {
    this.notificationService.getNotificationsOfUser(userId).subscribe({
      next: (data) => {
        this.notifications = data;
      },
      error: (err) => {
        console.error('Lỗi tải thông báo:', err);
      }
    });
  }
}
