import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateAccountForParentRequest } from '../models/requests/create-account-for-parent-request';
import { CreateAccountForTeacherRequest } from '../models/requests/create-account-for-teacher-request';
import { CreateAccountForStudentRequest } from '../models/requests/create-account-for-student-request';
import { CreateAccountForDepartmentRequest } from '../models/requests/create-account-for-department-request';
import { UserAccount } from '../models/user-account';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  private apiUrl = 'http://localhost:9090/api/account'; // API base URL

  constructor(private http: HttpClient) {}

  createAccountForParent(data: CreateAccountForParentRequest): Observable<UserAccount> {
    return this.http.post<UserAccount>(`${this.apiUrl}/parent`, data);
  }

  createAccountForStudent(data: CreateAccountForStudentRequest): Observable<UserAccount> {
    return this.http.post<UserAccount>(`${this.apiUrl}/student`, data);
  }

  createAccountForTeacher(data: CreateAccountForTeacherRequest): Observable<UserAccount> {
    return this.http.post<UserAccount>(`${this.apiUrl}/teacher`, data);
  }

  createAccountForDepartment(data: CreateAccountForDepartmentRequest): Observable<UserAccount> {
    return this.http.post<UserAccount>(`${this.apiUrl}/department`, data);
  }

  getAllAccounts(): Observable<UserAccount[]> {
    return this.http.get<UserAccount[]>(this.apiUrl);
  }

  deleteAccount(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAccountById(id: string): Observable<UserAccount> {
    return this.http.get<UserAccount>(`${this.apiUrl}/${id}`);
  }
}
