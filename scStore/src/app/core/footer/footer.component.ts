import {Component, HostListener} from '@angular/core';
import {headerAnimation} from "../../shared/animation";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [headerAnimation],
})
export class FooterComponent {

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

}
