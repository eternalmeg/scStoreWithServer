import {Component, OnInit} from '@angular/core';
import {User} from "../../types/user";
import {Device} from "../../types/device";
import {UserService} from "../../user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DeviceService} from "../../catalog/device.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{


  user: User | undefined;
  devices: Device[] | undefined = undefined;
  hasDevices = false;
  isLoading = true;
  deviceId = this.route.snapshot.params["id"]
  price: number | 0 | undefined

  constructor(private userService: UserService, private router: Router,private deviceService: DeviceService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe((user) => {
      this.user = user;
      this.devices = user.preferDevice;


      if(this.devices?.length !== 0) {
        this.hasDevices = true;
      }
      this.price = this.devices?.reduce((sum, device) => sum + (device.price || 0), 0);

    })

  }

  buyHandler(): void {
    if (!this.devices || this.devices.length === 0) {
      alert("No devices to add!");
      return;
    }

    const deviceIds = this.devices.map(device => device._id);

    this.deviceService.deleteMultipleDevices(deviceIds).subscribe({
      next: (response) => {
        alert(response.message);
        this.devices = [];
        this.hasDevices = false;
        this.price = 0;
      },
      error: (err) => {
        console.error('Error deleting devices', err);
        alert('Something went wrong. Please try again later.');
      }
    });
  }

  cancelHandler(deviceId:string) {
    if (!confirm("Are you sure you want to cancel this item?")) {
      return;
    }
    this.deviceService.cancelPrefer(deviceId).subscribe({
      next: (response) => {
        alert(response.message);

        this.devices = this.devices?.filter(device => device._id !== deviceId);

        this.price = this.devices?.reduce((sum, device) => sum + (device.price || 0), 0);

        if (this.devices?.length === 0) {
          this.hasDevices = false;
        }
      },
      error: (err) => {
        alert('Something went wrong. Please try again.')
      }
    })
  }

  cancelAllHandler() {
    if(!this.devices || this.devices.length === 0) {
      alert("No devices to cancel");
      return;
    }
    if(!confirm("Are you sure you want to cancel your devices")) {
      return;
    }

    const deviceIds = this.devices.map(device => device._id);
    this.deviceService.cancelAllPrefer(deviceIds).subscribe({
      next: (response) => {
        alert(response.message);
        this.devices = [];
        this.hasDevices = false;
        this.price = 0;
      },
      error: (err) => {
        console.error('Error canceling devices', err);
        alert('Failed to cancel. Please try again later.')
      }

    })
  }

  infoHandler() {
    const ownerIds = this.devices?.map(device => device.owner);

    this.userService.getOwnersByIds(ownerIds).subscribe(owners => {
     const devicesWithOwners = this.devices?.map(device => {



       const owner = owners.find(o => JSON.stringify(o._id) === JSON.stringify(device.owner) );
       return {
         ...device, owner
       }
     });
      this.router.navigate(['/seller-info'], {state: {devicesWithOwners}})
    })
  }


}
