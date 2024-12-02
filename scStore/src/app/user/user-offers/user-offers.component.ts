import {Component, OnInit} from '@angular/core';
import {Device} from "../../types/device";
import {User} from "../../types/user";
import {UserService} from "../user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DeviceService} from "../../catalog/device.service";

@Component({
  selector: 'app-user-offers',
  templateUrl: './user-offers.component.html',
  styleUrls: ['./user-offers.component.css']
})
export class UserOffersComponent implements OnInit{

  user: User | undefined;
  devices: Device[] | undefined = undefined;
 hasDevices = false;
  isLoading = true;

  constructor(private userService: UserService, private router: Router,private deviceService: DeviceService, private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.userService.getProfile().subscribe((user) => {
      this.user = user;
      this.devices = user.createdDevice;

      if(this.devices?.length !== 0) {
        this.hasDevices = true;
      }
    })

  }



}
