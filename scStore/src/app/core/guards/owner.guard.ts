import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {DeviceService} from "../../catalog/device.service";
import {UserService} from "../../user/user.service";



@Injectable({
  providedIn: 'root',
})
export class EditDeviceGuard implements CanActivate {
  constructor(
    private deviceService: DeviceService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const deviceId = route.params['id'];

    if (!deviceId) {
      this.router.navigate(['/error'], { state: { message: 'Device ID is missing.' } });
      return of(false);
    }

    return this.deviceService.getDevice(deviceId).pipe(
      switchMap((device) => {
        const currentUser = this.userService.user;

        if (!currentUser) {
          this.router.navigate(['/login']);
          return of(false);
        }


        if (JSON.stringify(device.owner) === JSON.stringify( currentUser._id)) {
          return of(true);
        } else {
          this.router.navigate(['/catalog']);
          return of(false);
        }
      }),
      catchError((error) => {
        console.error('Error fetching device or user:', error);
        this.router.navigate(['/404'], { state: { message: 'Error during ownership check.' } });
        return of(false);
      })
    );
  }
}
