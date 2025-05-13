import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  id: string;
  username: string;
  role: string;
  jwt: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'jwtToken';
  private readonly USER_ID_KEY = 'userId';
  private readonly USERNAME_KEY = 'username';
  private readonly ROLE_KEY = 'role';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
  return this.http.post<LoginResponse>('http://localhost:9090/api/auth', credentials).pipe(
    tap(response => {
      console.log('Login response:', response); // Debug
      if (response.jwt) {
        localStorage.setItem(this.TOKEN_KEY, response.jwt);
        localStorage.setItem(this.USER_ID_KEY, response.id);
          localStorage.setItem(this.USERNAME_KEY, response.username);
          localStorage.setItem(this.ROLE_KEY, response.role); // lưu role ở đây
      } else {
        console.error('No jwt field in response');
      }
    })
  );
}

getRole(): string {
  return localStorage.getItem(this.ROLE_KEY) || 'guest';
}


logout(): void {
  localStorage.removeItem(this.TOKEN_KEY);
  localStorage.removeItem(this.USER_ID_KEY);
  localStorage.removeItem(this.USERNAME_KEY);
  localStorage.removeItem(this.ROLE_KEY);
  this.router.navigate(['/login']);
}

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

getUserId(): string | null {
    return localStorage.getItem(this.USER_ID_KEY);
 }

  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }
}

