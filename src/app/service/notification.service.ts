import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification';
import { CreateNotificationRequest } from '../models/requests/create-notification-request';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:9090/api/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}`);
  }

  getNotificationById(notificationId: string): Observable<Notification> {
    return this.http.get<Notification>(`${this.baseUrl}/${notificationId}`);
  }

  createNotification(request: CreateNotificationRequest): Observable<Notification> {
    return this.http.post<Notification>(this.baseUrl, request);
  }

  getNotificationsOfUser(userId: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/user/${userId}`);
  }
}
