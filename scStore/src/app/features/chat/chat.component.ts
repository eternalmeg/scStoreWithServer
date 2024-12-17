import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ChatService } from '../chat-service.service';
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  @Input() sender: string = ''; // Името на изпращача
  @Input() about: string = ''; // Снимката на устройството
  @Input() receiverId: string = ''; // ID на получателя

  @Output() modalClosed = new EventEmitter<void>();

  messageContent: string = ''; // Съдържание на съобщението
  isModalOpen: boolean = false;
  senderName: string | undefined = '';

  constructor(private chatService: ChatService, private userService: UserService) {}

  ngOnInit(): void {

    this.senderName = this.userService.currentUserName;
  }



  closeModal(): void {
    this.modalClosed.emit();
  }



  sendMessage(): void {
    if (this.messageContent.trim()) {
      const message = {
        sender: this.sender, // Името на текущия потребител
        receiver: this.receiverId, // ID на получателя
        about: this.about, //анимката на устройството
        content: this.messageContent // Съдържание на съобщението


      };


      this.chatService.sendMessage(message.sender, message.receiver,message.about, message.content).subscribe(() => {
        alert('Message sent successfully!');
        this.closeModal();
      }, error => {
        console.error('Error sending message:', error);
      });
    } else {
      alert('Message content cannot be empty!');
    }
  }
}
