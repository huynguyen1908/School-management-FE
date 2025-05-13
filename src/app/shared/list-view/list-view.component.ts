import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserAccountService } from '../../service/user-account.service';
import { StudentService } from '../../service/student.service';
import { AuthService } from '../../service/auth.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterLink, HttpClientModule],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: any[] = [];
  type: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private userAccountService: UserAccountService,
    private studentService: StudentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.errorMessage = 'Vui lòng đăng nhập để xem danh sách.';
      this.router.navigate(['/login']);
      return;
    }

    if (this.authService.getRole() === 'admin') {
      this.type = this.route.snapshot.data['type'] || 'users';
      this.loadData();
    } else {
      this.errorMessage = 'Bạn không có quyền truy cập trang này.';
      this.router.navigate(['/']);
    }
  }

  loadData() {
    this.errorMessage = '';
    if (this.type === 'users') {
      this.displayedColumns = ['id', 'username', 'role', 'isActive', 'createAt', 'actions'];
      this.userAccountService.getAllAccounts().subscribe({
        next: (data: any[]) => this.dataSource = data,
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || 'Không thể tải danh sách tài khoản.';
          this.handleError(err);
        }
      });
    } else if (this.type === 'students') {
      this.displayedColumns = ['studentId', 'name', 'gender', 'dateOfBirth', 'className', 'parentName', 'actions'];
      this.studentService.getStudents().subscribe({
        next: (data: any[]) => this.dataSource = data,
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || 'Không thể tải danh sách học sinh.';
          this.handleError(err);
        }
      });
    }
  }

  deleteItem(id: string): void {
    if (this.type !== 'users') return; // Chỉ hỗ trợ xóa cho users hiện tại
    if (confirm('Bạn chắc chắn muốn xóa tài khoản này?')) {
      this.userAccountService.deleteAccount(id).subscribe({
        next: () => {
          this.loadData();
          this.errorMessage = '';
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || 'Không thể xóa tài khoản.';
          this.handleError(err);
        }
      });
    }
  }

  private handleError(err: HttpErrorResponse): void {
    if (err.status === 401 || err.status === 500) {
      this.errorMessage = 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.';
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
