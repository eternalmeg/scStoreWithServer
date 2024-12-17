import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat-service.service';
import { Message } from '../../types/message';
import {UserService} from "../../user/user.service";
import {forkJoin, map} from "rxjs";
import {User} from "../../types/user";

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css'],
})
export class MailboxComponent implements OnInit {
  unreadMessages: Message[] = [];
  currentUserId: string = '';
  currenUserName: string = '';
  selectedMessage: Message | null = null;

  isReplyModalOpen: boolean = false;
  replyReceiverId: string = '';
  replyAbout: string = '';


  constructor(private chatService: ChatService, private userService: UserService) {}


  ngOnInit(): void {
    this.userService.getProfile().subscribe((user) => {
      this.currentUserId = user?._id;
      this.currenUserName = user?.name;
      this.loadUnreadMessages();
    })

  }

  loadUnreadMessages(): void {
    this.chatService.getUnreadMessages(this.currentUserId).subscribe((messages) => {
      const messageRequests = messages.map((msg) =>
        this.userService.getUserById(msg.sender).pipe(
          map((user: User) => ({
            ...msg,
            senderName: user.name, // Добавяме името на изпращача
          }))
        )
      );

      // Изчакваме всички заявки да завършат
      forkJoin(messageRequests).subscribe((messagesWithSenders) => {
        console.log('Messages with senders:', messagesWithSenders);
        this.unreadMessages = messagesWithSenders;
      });
    });
  }

  openMessage(message: Message) {
    console.log('open invoked')
    this.selectedMessage = message;
  }

  markAsRead(messageId: string) {
this.chatService.markAsRead(messageId).subscribe(()=> {
  this.unreadMessages = this.unreadMessages.filter((msg) =>
    msg._id !== messageId
  );
})
  }

  replyToMessage() {
    console.log('reply invoked')
    //open chat modal
    if (this.selectedMessage) {
      this.replyReceiverId = this.selectedMessage.sender; // ID на изпращача
      this.replyAbout = this.selectedMessage.about;       // Снимката на устройството
      this.isReplyModalOpen = true;                       // Отваряме модала
    }
  }

  closeReplyModal(): void {
    this.isReplyModalOpen = false;
  }
  closeMessage() {
  if(this.selectedMessage) {
    this.markAsRead(this.selectedMessage._id);
    this.selectedMessage = null;
  }
  }




}
