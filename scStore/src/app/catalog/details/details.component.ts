import {Component, OnInit} from '@angular/core';
import {Device} from "../../types/device";
import {DeviceService} from "../device.service";
import {ActivatedRoute, Router} from "@angular/router";

import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  device: Device | undefined
  deviceId = this.route.snapshot.params["id"];
  isLoggedIn = false;
  isOwner = false;
  isPurchased = false;


  constructor(private deviceService: DeviceService,
              private route: ActivatedRoute,

              private userService: UserService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.deviceService.getDevice(this.deviceId).subscribe(device => {
      this.device = device;
      this.userService.user$.subscribe((user)=> {
        if(user) {
          this.isLoggedIn = true;
          console.log(user.preferDevice)
          if (Array.isArray(user?.preferDevice) &&
            user.preferDevice.some(device => device._id === this.deviceId)) {
            console.log("YES");
            this.isPurchased = true;
          } else {
            console.log("NO");
          }

          // @ts-ignore
          if(this.device?.owner === user?._id) {
            console.log(true)
            this.isOwner = true;
          }
        }
      })
    })

  }

  deleteHandler(): void {
   const confirmation = window.confirm("Are you sure you want to delete this offer?");
   if(confirmation) {
     console.log(this.deviceId)
     this.deviceService.deleteDevice(this.deviceId)
       .subscribe({
         next: ()=> {
           alert("Offer deleted successfully!");
           this.router.navigate(['/my-offers'])
           console.log(this.device?.preferredList)
         },
         error: (err) => {
           console.error('Error deleting offer', err);
           alert('Failed to delete offer. Please try again later.');
         }
       })
   }
  }

  editHandler():void {
    this.router.navigate([`/edit-offer/${this.deviceId}`], { state: { isOwner: this.isOwner } });
  }

  buyHandler(): void {
    const confirmation = window.confirm("Are you sure you want to buy this device?");
    if (confirmation) {
      this.deviceService.buyDevice(this.deviceId)
        .subscribe({
          next: () => {
            alert("Device successfully added to your cart!");
            this.isPurchased = true;
            this.router.navigate(['/cart']);
          },
          error: (err) => {
            console.error('Error purchasing device', err);
            alert('Failed to purchase device. Please try again later.');
          }
        });
    }
  }

}
