import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../../user/user.service";
import {map} from "rxjs";

export const guestGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)

  return userService.getProfile().pipe(
    map((user) => {
      if(user) {
        console.log(user);
        router.navigate(['/home'])
        return false;
      }
      return true;
    })
  )


};
