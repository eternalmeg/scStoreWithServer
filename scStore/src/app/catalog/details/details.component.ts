import { Component, OnInit } from '@angular/core';
import { Device } from "../../types/device";
import { DeviceService } from "../device.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../user/user.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  device: Device | undefined;
  deviceId = this.route.snapshot.params["id"];
  isLoggedIn = false;
  isOwner = false;
  isPurchased = false;
  isExpanded = false;
  length: number | undefined// Флаг за състоянието на текста

  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.deviceService.getDevice(this.deviceId).subscribe(device => {
      this.device = device;
      console.log(device)
      this.length = this.device.description.length;
      this.userService.user$.subscribe((user) => {
        if (user) {
          this.isLoggedIn = true;
          if (
            Array.isArray(user?.preferDevice) &&
            user.preferDevice.some(device => device._id === this.deviceId)
          ) {
            this.isPurchased = true;
          }

          if (JSON.stringify(this.device?.owner) === JSON.stringify(user?._id)) {
            this.isOwner = true;
          }
        }
      });
    });
  }


  get truncatedDescription(): string {
    if (this.length) {
      return this.length > 500
        ? this.device?.description.slice(0, 500) + '...'
        : this.device?.description || '';
    } else {
      return ''
    }

  }

  // Превключва състоянието на текста
  toggleDescription(): void {
    this.isExpanded = !this.isExpanded;
  }

  deleteHandler(): void {
    const confirmation = window.confirm("Are you sure you want to delete this offer?");
    if (confirmation) {
      this.deviceService.deleteDevice(this.deviceId).subscribe({
        next: () => {
          alert("Offer deleted successfully!");
          this.router.navigate(['/my-offers']);
        },
        error: (err) => {
          console.error('Error deleting offer', err);
          alert('Failed to delete offer. Please try again later.');
        }
      });
    }
  }

  editHandler(): void {
    this.router.navigate([`/edit-offer/${this.deviceId}`], { state: { isOwner: this.isOwner } });
  }

  buyHandler(): void {
    const confirmation = window.confirm("Are you sure you want to add this device?");
    if (confirmation) {
      this.deviceService.buyDevice(this.deviceId).subscribe({
        next: () => {
          alert("Device successfully added to your wish list!");
          this.isPurchased = true;
          this.router.navigate(['/cart']);
        },
        error: (err) => {
          console.error('Error purchasing device', err);
          alert('Failed to add device. Please try again later.');
        }
      });
    }
  }
}
