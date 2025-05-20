import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tuition } from '../models/tuition';
import { TuitionRequest } from '../models/requests/tuition-request';
import { TuitionStatus } from '../models/tuition-status.enum';

@Injectable({
  providedIn: 'root'
})
export class TuitionService {

  private baseUrl = 'http://localhost:9090/tuition';

  constructor(private http: HttpClient) {}

  createTuition(request: TuitionRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}`, request);
  }

  getTuitionsByStudentId(studentId: string): Observable<Tuition[]> {
    return this.http.get<Tuition[]>(`${this.baseUrl}/student/${studentId}`);
  }

  getTuitionById(tuitionId: string): Observable<Tuition> {
    return this.http.get<Tuition>(`${this.baseUrl}/${tuitionId}`);
  }
}
