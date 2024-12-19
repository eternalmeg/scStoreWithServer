import {Component, HostListener, OnInit} from '@angular/core';
import {UserService} from "../../user/user.service";
import {Router} from "@angular/router";
import {headerAnimation} from "../../shared/animation";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [headerAnimation],
})


export class HeaderComponent implements OnInit{

  headerState = 'default';
  isLoggedIn = false;


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (offset > 50) {
      this.headerState = 'scrolled';
    } else {
      this.headerState = 'default';
    }
  }
  constructor(private userService: UserService, private router: Router) {
  }
  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.isLoggedIn = !!user;
    })
  }


  logoutHandler() : void {
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigate(['/home'])
      },
      error: () => {
        this.router.navigate(['/login'])
      }
    })
  }

}
