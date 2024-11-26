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
      alert("No devices to buy!");
      return;
    }

    const deviceIds = this.devices.map(device => device._id);

    this.deviceService.deleteMultipleDevices(deviceIds).subscribe({
      next: (response) => {
        alert(response.message);
        this.devices = []; // Изчистване на списъка с устройства от интерфейса
        this.hasDevices = false; // Обновяване на състоянието
        this.price = 0; // Нулиране на общата цена
      },
      error: (err) => {
        console.error('Error deleting devices', err);
        alert('Failed to complete the purchase. Please try again later.');
      }
    });
  }

  cancelHandler(deviceId:string) {
    if (!confirm("Are you sure you want to cancel this purchase?")) {
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
        alert('Failed to cancel the purchase. Please try again.')
      }
    })
  }


}
