import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../service/notification.service';
import { Notification } from '../../models/notification';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-detail',
  imports: [CommonModule],
  templateUrl: './notification-detail.component.html',
  styleUrl: './notification-detail.component.scss'
})
export class NotificationDetailComponent implements OnInit {
  notification: Notification | undefined;

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const notificationId = this.route.snapshot.paramMap.get('notificationId');
    console.log('Notification ID from route:', notificationId); // Debug
    if (notificationId) {
      this.notificationService.getNotificationById(notificationId).subscribe({
        next: (data) => {
          console.log('Notification data:', data); // Debug
          this.notification = data;
        },
        error: (err) => {
          console.error('Lỗi khi tải thông báo chi tiết:', err);
        }
      });
    } else {
      console.error('No notificationId in route');
    }
  }
}
