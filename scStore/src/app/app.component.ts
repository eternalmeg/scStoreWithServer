 import {Component, OnInit} from '@angular/core';
 import {ApiService} from "./api.service";
 import {UserService} from "./user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'scStore';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (user) => console.log("User loaded on init", user),
      error: (err) => console.log("Failed to load user", err)
    })
  }


}
