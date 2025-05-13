import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserAccount } from '../../models/user-account';
import { UserAccountService } from '../../service/user-account.service';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterLink, MatIconModule, HttpClientModule],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss'
})
export class AccountListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'role', 'isActive', 'createAt', 'actions'];
  accounts: UserAccount[] = [];
  errorMessage: string = '';

  constructor(
    private accountService: UserAccountService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.errorMessage = 'Vui lòng đăng nhập để xem danh sách tài khoản.';
      this.router.navigate(['/login']);
      return;
    }
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getAllAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
        this.errorMessage = '';
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error details:', err); // Debug
        this.errorMessage = err.error?.message || 'Không thể tải danh sách tài khoản. Vui lòng thử lại sau.';
        if (err.status === 401 || err.status === 500) {
          this.errorMessage = 'Token không hợp lệ hoặc phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.';
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    });
  }

  deleteAccount(id: string): void {
    if (confirm('Bạn chắc chắn muốn xóa tài khoản này?')) {
      this.accountService.deleteAccount(id).subscribe({
        next: () => {
          this.loadAccounts();
          this.errorMessage = '';
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || 'Không thể xóa tài khoản. Vui lòng thử lại sau.';
          console.error('Error deleting account:', err);
          if (err.status === 401 || err.status === 500) {
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        }
      });
    }
  }
}