import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Class } from '../models/class';
import { Student } from '../models/student';
import { CreateClassRequest } from '../models/requests/create-class-request';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
 private baseUrl = 'http://localhost:9090/classes';

  constructor(private http: HttpClient) {}

  getAllClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(`${this.baseUrl}`);
  }

  createClass(classData: CreateClassRequest): Observable<Class> {
    return this.http.post<Class>(`${this.baseUrl}`, classData);
  }

  addStudentToClass(classId: string, studentId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${classId}/students/${studentId}`, {});
  }

  getStudentsOfClass(classId: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/${classId}/students`);
  }
}
