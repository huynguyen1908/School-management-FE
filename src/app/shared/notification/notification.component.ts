import { Observable } from 'rxjs';
import { RequestService } from '../../service/request.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { Component } from '@angular/core';
import { Notification } from '../../models/notification';
import { NotificationService } from '../../service/notification.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-notification',
  standalone: true, 
  imports: [CommonModule, RouterModule, MatTableModule, MatMenuModule, MatIconModule, MatButtonModule, MatBadgeModule, MatListModule, RouterLink],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  displayedColumns: string[] = ['title'];

  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService, private router: Router) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
      },
      error: (err) => {
        console.error('Lỗi khi tải thông báo', err);
      }
    });
  }

  openNotificationDetail(notification: Notification): void {
    // Khi người dùng nhấn vào một thông báo, chuyển đến trang chi tiết của thông báo
    this.router.navigate(['/admin/notifications/detail', notification.notificationId]);
  }
}
