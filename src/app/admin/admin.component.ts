import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../service/notification.service';
import { Notification } from '../models/notification';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../service/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    HttpClientModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  isSidebarOpen = true;

  notifications: Notification[] = [];

  constructor(
    private notificationService: NotificationService, 
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
  this.notificationService.getNotifications().subscribe({
    next: (data) => {
      this.notifications = data;
      console.log('Notifications loaded:', data);
      console.log('Notifications length:', data.length);
    },
    error: (err) => {
      console.error('Lỗi khi tải thông báo:', err);
    }
  });
}

  openNotificationDetail(notification: Notification): void {
    console.log('Clicked notification:', notification);
    if (!notification.notificationId) {
      console.error('Notification ID is missing:', notification);
      return;
    }
    console.log('Navigating to:', `/admin/notifications/detail/${notification.notificationId}`);
    this.router.navigate(['/admin/notifications/detail', notification.notificationId]);
  }
}
