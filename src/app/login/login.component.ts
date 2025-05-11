import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface LoginResponse {
  id: string;
  username: string;
  role: string;
  jwt: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Vui lòng nhập tên đăng nhập và mật khẩu.';
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: LoginResponse) => {
        console.log('Login response:', res);
        const role = this.authService.getRole();
        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (role === 'STUDENT'){
          this.router.navigate(['/student']);
        } else if (role === 'PARENT'){
          this.router.navigate(['/parent']);
        } else if (role === 'TEACHER'){
          this.router.navigate(['/teacher']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra tên đăng nhập hoặc mật khẩu.';
        console.error('Login error:', err);
      }
    });
  }

}
// export class LoginComponent {
//   loginForm: FormGroup;
//   errorMessage = '';

//   constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
//     this.loginForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }

//   login(): void {
//     if (this.loginForm.invalid) return;

//     this.authService.login(this.loginForm.value).subscribe({
//       next: (res) => {
//         localStorage.setItem('jwtToken', res.token);
//         this.router.navigate(['/admin']); // chuyển hướng sau login
//       },
//       error: (err) => {
//         this.errorMessage = 'Login failed. Please check credentials.';
//         console.error(err);
//       }
//     });
//   }
// }
