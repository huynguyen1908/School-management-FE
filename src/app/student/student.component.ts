import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NotificationService } from '../service/notification.service';
import { Notification } from '../models/notification';
import { Student } from '../models/student';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
  isSidebarOpen = true;
  notifications: Notification[] = [];
  student!: Student;

  constructor(
    private studentService: StudentService,
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
      this.studentService.getStudentByUserId(userId).subscribe({
      next: (res) => (this.student = res),
      error: (err) => console.error('Không lấy được thông tin student:', err),
    });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
