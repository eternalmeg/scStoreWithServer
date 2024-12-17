import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../types/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/chat';

  constructor(private http: HttpClient) {}


  sendMessage(sender: string, receiver: string, about: string, content: string): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/send`, { sender, receiver,about, content });
  } //add about


  getConversation(user1: string, user2: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/conversation/${user1}/${user2}`);
  }


  getUnreadMessages(userId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/unread/${userId}`);
  }


  markAsRead(messageId: string): Observable<Message> {
    return this.http.patch<Message>(`${this.apiUrl}/mark-read/${messageId}`, {});
  }


  getMessages(userId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/${userId}`);
  }
  getUnreadMessageCount(userId: string): Observable<{ unreadCount: number }> {
    return this.http.get<{ unreadCount: number }>(`${this.apiUrl}/unread-messages/${userId}`);
  }
}
