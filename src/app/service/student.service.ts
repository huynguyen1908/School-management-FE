import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { Parent } from '../models/parent';
import { StudentUpdateRequest } from '../models/requests/student-update-request';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:9090/api/user'; // URL của API Spring Boot

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students`);
  }

  // Lấy thông tin chi tiết của một học sinh theo id
  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/students/${id}`);
  }

  // Lấy thông tin phụ huynh của một học sinh
  getParentFromStudent(studentId: string): Observable<Parent> {
    return this.http.get<any>(`${this.baseUrl}/students/${studentId}/parents`);
  }

  // Lấy danh sách học sinh của một phụ huynh
  getStudentsFromParent(parentId: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/parents/${parentId}/students`);
  }

  // Gán phụ huynh cho học sinh
  assignParentToStudent(studentId: string, parentId: string): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/students/${studentId}/assign-parent/${parentId}`, {});
  }
  
  getStudentByUserId(userId: String): Observable<Student>{
    return this.http.get<Student>(`${this.baseUrl}/by-student/${userId}`)
  }

  editStudent(studentId: string, request: StudentUpdateRequest): Observable<Student> {
  return this.http.put<Student>(`${this.baseUrl}/student/${studentId}`, request);
}

}