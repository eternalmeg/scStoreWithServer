import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../features/chat-service.service";
import {UserService} from "../../user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  unreadCount: number = 0;
  isMessage: boolean = false;

  constructor(private chatService: ChatService, private userService: UserService, private router: Router) {
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  ngOnInit(): void {
    const userId = this.userService.user?._id;
    if (userId) {
      this.updateUnreadCount(userId);
    }
  }
  updateUnreadCount(userId: string): void {
    this.chatService.getUnreadMessageCount(userId).subscribe({
      next: (response) => {
        this.unreadCount = response.unreadCount;
        this.isMessage = this.unreadCount > 0;
      },
      error: (err) => {
        console.error('Error fetching unread messages:', err);
      }
    });
  }
markAsRead() {
  const userId = this.userService.user?._id;



}
  redirectToProfile(): void {
    //this.router.navigate(['/my-profile'], { state: { openChat: true } });
    this.router.navigate(['/my-profile'], { queryParams: { openChat: true } });
  }

}
