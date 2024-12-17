import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../types/user';
import { Device } from '../../types/device';
import { NgForm } from '@angular/forms';
import { fieldAnimation } from '../../shared/animation';
import { ChatService } from '../../features/chat-service.service';
import { Message } from '../../types/message';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [fieldAnimation],
})
export class ProfileComponent implements OnInit {
  @ViewChild('form') form: NgForm | undefined;

  unreadMessages: Message[] = [];
  currentUserId: string = '';
  user: User | undefined;
  devices: Device[] | undefined;
  showEditMode = false;
  isUpdating = false;

  messages: { sender: string; senderName: string; content: string }[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {}

  get name(): string {
    return this.userService.user?.name || '';
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe((user) => {
      this.user = user;
      this.devices = user.createdDevice;
      this.currentUserId = user?._id;
      this.loadUnreadMessages();

    });
  }

  loadUnreadMessages(): void {
    this.chatService.getUnreadMessages(this.currentUserId).subscribe((messages: Message[]) => {
      this.unreadMessages = messages;
    });
  }

  goToMailbox(): void {
    this.router.navigate(['/mailbox']);
  }



  onToggle(): void {
    this.showEditMode = !this.showEditMode;
    if (this.showEditMode) {
      setTimeout(() => {
        const name = this.user?.name || '';
        const phone = this.user?.phone || '';
        this.form?.setValue({ name, phone });
      }, 0);
    }
  }

  submitHandler() {
    if (this.form?.invalid) {
      return;
    }

    this.isUpdating = true;
    const { name, phone } = this.form?.value;
    this.userService.updateProfile(name, phone).subscribe(() => {
      this.userService.getProfile().subscribe((user) => {
        this.user = user;
        this.devices = user.createdDevice;
        this.onToggle();
        this.isUpdating = false;
      });
    });
  }
}
