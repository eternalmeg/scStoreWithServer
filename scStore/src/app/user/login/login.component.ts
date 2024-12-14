import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import {fieldAnimation} from "../../shared/animation";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fieldAnimation],
})
export class LoginComponent {
  returnUrl: string = '/home';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'] || '/home';
    });
  }

  submitHandler(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const { email, password } = form.value;

    this.userService.login(email, password).subscribe(() => {

      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
