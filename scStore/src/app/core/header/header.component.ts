import {Component, HostListener} from '@angular/core';
import {UserService} from "../../user/user.service";
import {Router} from "@angular/router";
import {headerAnimation} from "../../shared/animation";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [headerAnimation],
})
export class HeaderComponent {

  headerState = 'default';


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (offset > 50) {
      this.headerState = 'scrolled'; // Промяна към "scrolled" състояние
    } else {
      this.headerState = 'default'; // Промяна към "default" състояние
    }
  }


  constructor(private userService: UserService, private router: Router) {
  }



  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  logoutHandler() : void {
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login'])
      },
      error: () => {
        this.router.navigate(['/login'])
      }
    })
  }

}
