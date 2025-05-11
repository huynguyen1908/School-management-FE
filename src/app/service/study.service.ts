import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Studyscore } from '../models/studyscore';
import { Assignment } from '../models/assignment';
import { Observable } from 'rxjs';
import { CreateAssignmentRequest } from '../models/requests/create-assignment-request';
import { StudyScoreRequest } from '../models/requests/study-score-request';

@Injectable({
  providedIn: 'root'
})
export class StudyService {

  private baseUrl = 'http://localhost:9090/api/study'; // URL của API Spring Boot

  constructor(private http: HttpClient) {}

  getStudentScores(studentId: string): Observable<Studyscore[]> {
    return this.http.get<Studyscore[]>(`${this.baseUrl}/students/${studentId}/scores`);
  }

  // Nhập điểm
  enterScore(request: StudyScoreRequest): Observable<Studyscore> {
    return this.http.post<Studyscore>(`${this.baseUrl}/scores`, request);
  }

  // Tạo bài tập
  createAssignment(request: CreateAssignmentRequest): Observable<Assignment> {
    return this.http.post<Assignment>(`${this.baseUrl}/assignment/create`, request);
  }

  // Lấy tất cả bài tập
  getAllAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.baseUrl}`);
  }

  // Cập nhật điểm
  updateScore(scoreId: string, request: StudyScoreRequest): Observable<Studyscore> {
    return this.http.put<Studyscore>(`${this.baseUrl}/scores/${scoreId}`, request);
  }

  // Lấy bài tập theo giáo viên
  getAssignmentsOfTeacher(teacherId: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.baseUrl}/assignments/teacher/${teacherId}`);
  }

  // Lấy bài tập theo học sinh
  getAssignmentsOfStudent(studentId: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.baseUrl}/assignments/student/${studentId}`);
  }

  // Lấy bài tập theo ID
  getAssignmentById(assignmentId: string): Observable<Assignment> {
    return this.http.get<Assignment>(`${this.baseUrl}/assignment/${assignmentId}`);
  }
}
