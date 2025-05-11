import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from '../models/teacher';
import { Observable } from 'rxjs';
import { Assignment } from '../models/assignment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = 'http://localhost:9090/api/user/teachers'; // URL của API Spring Boot

  constructor(private http: HttpClient) {}

  getTeacherList(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.baseUrl}`);
  }

  getTeacherById(id: string): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.baseUrl}/${id}`);
  }

  getTeacherAssignments(id: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.baseUrl}/${id}/assigments`);
  }
}
