import { Component, ViewChild } from '@angular/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Teacher } from '../models/teacher';
import { TeacherService } from '../service/teacher.service';
import { AuthService } from '../service/auth.service';
import { NotificationService } from '../service/notification.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Notification } from '../models/notification';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-teacher',
  imports: [CommonModule, 
    MatListModule,
    RouterLink,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    RouterModule],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.scss'
})
export class TeacherComponent {

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  isSidebarOpen = true;
  notifications: Notification[] = [];
  teacher!: Teacher;

  constructor(
    private teacherService: TeacherService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.notificationService.getNotificationsOfUser(userId).subscribe({
        next: (res) => {
          this.notifications = res;
        },
        error: (err) => {
          console.error('Không lấy được thông báo:', err);
        }
      });
      this.teacherService.getTeacherByUserId(userId).subscribe({
      next: (res) => (this.teacher = res),
      error: (err) => console.error('Không lấy được thông tin giáo viên:', err),
    });
    }
  }

  logout(): void {
    this.authService.logout();
  }

}
