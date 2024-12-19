import { Component } from '@angular/core';
import {UserService} from "../../user/user.service";
import {Router} from "@angular/router";
import {User} from "../../types/user";
import {Device} from "../../types/device";
import {ChatService} from "../chat-service.service";

@Component({
  selector: 'app-seller-info',
  templateUrl: './seller-info.component.html',
  styleUrls: ['./seller-info.component.css']
})
export class SellerInfoComponent {
  devicesWithOwners: { brand: string; model: string;image: string,description: string, price: number; owner: User, createdAt: string }[] = [];

  constructor(protected userService: UserService, private router: Router, private chatService: ChatService) {
    const navigation = this.router.getCurrentNavigation();
    this.devicesWithOwners = navigation?.extras.state?.['devicesWithOwners'] || [];
  }

  isChatModalOpen: boolean = false;
  selectedDevice: Device | undefined;
  selectedSeller: User | undefined;




  openModal(device: { brand: string; model: string; image: string;description:string, price: number; owner: User, createdAt: string  }, seller: User): void {
    console.log('Device:', device);
    this.isChatModalOpen = true;
    this.selectedDevice = device;
    this.selectedSeller = seller;

  }

  closeModal(): void {
    this.isChatModalOpen = false;
    this.selectedDevice = undefined;
    this.selectedSeller = undefined;
  }


}
