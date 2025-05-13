import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './service/auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        alert('Phiên đăng nhập đã hết hạn. Đang đăng xuất...');
        authService.logout();  // Xóa localStorage + điều hướng
      }
      return throwError(() => error);
    })
  );
};

