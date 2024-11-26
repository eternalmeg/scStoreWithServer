import {Component} from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  emailValidatorPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private userService: UserService, private router: Router) {
  }

  submitHandler(form: NgForm): void {
    if (form.invalid) {
      console.log('invalid')
      return
    }
    const {
      name,
      email,
      phone,
      passwords
    } = form.value;

    this.userService
      .register(name, email, phone, passwords.password, passwords.rePassword)
      .subscribe(() => {
        this.router.navigate(['/home'])

      })

  }

}
