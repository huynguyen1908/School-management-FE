import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TeacherGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('jwtToken');
    const role = localStorage.getItem('role');

    if (token && role === 'TEACHER') {
      return true;
    }
  }

  this.router.navigate(['/login']);
  return false;
}

}

