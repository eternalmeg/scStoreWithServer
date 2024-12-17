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

  // Изпращане на съобщение
  sendMessage(sender: string, receiver: string, about: string, content: string): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/send`, { sender, receiver,about, content });
  } //add about

  // Извличане на разговор между двама потребители
  getConversation(user1: string, user2: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/conversation/${user1}/${user2}`);
  }

  // Извличане на непрочетени съобщения
  getUnreadMessages(userId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/unread/${userId}`);
  }

  // Маркиране на съобщение като прочетено
  markAsRead(messageId: string): Observable<Message> {
    return this.http.patch<Message>(`${this.apiUrl}/mark-read/${messageId}`, {});
  }

  // Извличане на всички съобщения за потребител
  getMessages(userId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/${userId}`);
  }
  getUnreadMessageCount(userId: string): Observable<{ unreadCount: number }> {
    return this.http.get<{ unreadCount: number }>(`${this.apiUrl}/unread-messages/${userId}`);
  }
}
