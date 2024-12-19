import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../types/message';
import {API_URL} from "../shared/api-config";

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private api = API_URL;

  constructor(private http: HttpClient) {}


  sendMessage(sender: string, receiver: string, about: string, content: string): Observable<Message> {
    return this.http.post<Message>(`${this.api}/chat/send`, { sender, receiver,about, content });
  } //add about


  getConversation(user1: string, user2: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.api}/chat/conversation/${user1}/${user2}`);
  }


  getUnreadMessages(userId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.api}/chat/unread/${userId}`);
  }


  markAsRead(messageId: string): Observable<Message> {
    return this.http.patch<Message>(`${this.api}/chat/mark-read/${messageId}`, {});
  }


  getMessages(userId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.api}/chat/${userId}`);
  }
  getUnreadMessageCount(userId: string): Observable<{ unreadCount: number }> {
    return this.http.get<{ unreadCount: number }>(`${this.api}/chat/unread-messages/${userId}`);
  }
}
