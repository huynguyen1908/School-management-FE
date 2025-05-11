import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Route, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class StudentGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('jwtToken');
    const role = localStorage.getItem('role');

    if (token && role === 'STUDENT') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
