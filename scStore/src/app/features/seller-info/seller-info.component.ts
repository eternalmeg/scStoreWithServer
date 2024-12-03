import { Component } from '@angular/core';
import {UserService} from "../../user/user.service";
import {Router} from "@angular/router";
import {User} from "../../types/user";

@Component({
  selector: 'app-seller-info',
  templateUrl: './seller-info.component.html',
  styleUrls: ['./seller-info.component.css']
})
export class SellerInfoComponent {
  devicesWithOwners: { brand: string; model: string; price: number; owner: User }[] = [];

  constructor(private userService: UserService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.devicesWithOwners = navigation?.extras.state?.['devicesWithOwners'] || [];
  }




}
