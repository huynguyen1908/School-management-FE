import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { StudentListComponent } from './admin/student-list/student-list.component';
import { StudentEditComponent } from './shared/student-edit/student-edit.component';
import { StudentDetailComponent } from './shared/student-detail/student-detail.component';
import { AdminGuard } from './auth/admin.guard';
import { StudentComponent } from './student/student.component';
import { StudentGuard } from './auth/student.guard';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherDetailComponent } from './shared/teacher-detail/teacher-detail.component';
import { TeacherGuard } from './auth/teacher.guard';

export const routes: Routes = [
    {
      path: 'admin',
      canActivate: [AdminGuard],
      component: AdminComponent,
      children: [
        { path: 'students', component: StudentListComponent },
        { path: 'students/edit/:id', component: StudentEditComponent },
        { path: 'students/detail/:id', component: StudentDetailComponent },
        { path: 'accounts/create', loadComponent: () => import('./admin/create-account/create-account.component').then((m) => m.CreateAccountComponent), },
        { path: 'accounts', loadComponent: () => import('./admin/account-list/account-list.component').then((m) => m.AccountListComponent),},
        { path: 'accounts/edit/:id', loadComponent: () => import('./admin/edit-account/edit-account.component').then((m) => m.EditAccountComponent)},
        { path: 'teachers', loadComponent: () => import('./admin/teacher-list/teacher-list.component').then((m) => m.TeacherListComponent)},
        { path: 'classes', loadComponent: () => import('./shared/class-list/class-list.component').then((m) => m.ClassListComponent)},
        { path: 'classes/detail/:id', loadComponent: () => import('./shared/class-detail/class-detail.component').then((m) => m.ClassDetailComponent)},
        { path: 'classes/create', loadComponent: () => import('./admin/create-class/create-class.component').then((m) => m.CreateClassComponent)},
        { path: 'notifications', loadComponent: () => import('./shared/notification/notification.component').then((m) => m.NotificationComponent)},
        { path: 'notifications/detail/:notificationId', loadComponent: () => import('./shared/notification-detail/notification-detail.component').then((m) => m.NotificationDetailComponent)},
        { path: 'notifications/create', loadComponent: () => import('./shared/create-notification/create-notification.component').then((m) => m.CreateNotificationComponent)},
      
        { path: '', redirectTo: 'students', pathMatch: 'full' }
      ]
    },
    {path: 'student',
      canActivate: [StudentGuard],
      component: StudentComponent,
      children: [
        { path: 'notifications', loadComponent: () => import('./shared/user-notification-list/user-notification-list.component').then((m) => m.UserNotificationListComponent)},
        { path: 'notifications/detail/:notificationId', loadComponent: () => import('./shared/notification-detail/notification-detail.component').then((m) => m.NotificationDetailComponent)},
        { path: 'detail/:id', component: StudentDetailComponent },
        { path: 'edit/:id', component: StudentEditComponent },
        { path: 'assignments', loadComponent: () => import('./shared/assignment-list/assignment-list.component').then((m) => m.AssignmentListComponent)},
        { path: 'assignments/detail/:assignmentId', loadComponent: () => import('./shared/assignment-detail/assignment-detail.component').then((m) => m.AssignmentDetailComponent)},
        { path: 'tuition', loadComponent: () => import('./shared/tuition-list/tuition-list.component').then((m) => m.TuitionListComponent)}
      ]
    },
    {path: 'teacher',
      canActivate: [TeacherGuard],
      component: TeacherComponent,
      children: [
        { path: 'detail/:id', component: TeacherDetailComponent },
        { path: 'classes/detail/:id', loadComponent: () => import('./shared/class-detail/class-detail.component').then((m) => m.ClassDetailComponent)},
        { path: 'notifications', loadComponent: () => import('./shared/notification/notification.component').then((m) => m.NotificationComponent)},
        { path: 'notifications/detail/:notificationId', loadComponent: () => import('./shared/notification-detail/notification-detail.component').then((m) => m.NotificationDetailComponent)},
        { path: 'notifications/create', loadComponent: () => import('./shared/create-notification/create-notification.component').then((m) => m.CreateNotificationComponent)},
        { path: 'assignments', loadComponent: () => import('./shared/assignment-list/assignment-list.component').then((m) => m.AssignmentListComponent)},
        { path: 'assignments/detail/:assignmentId', loadComponent: () => import('./shared/assignment-detail/assignment-detail.component').then((m) => m.AssignmentDetailComponent)},
      ]

    },
    { path: 'login', loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent), },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' },
  ];
