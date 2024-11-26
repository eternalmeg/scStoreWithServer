import {Component, OnInit} from '@angular/core';
import {DeviceService} from "../device.service";
import {Device} from "../../types/device";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit{

  devices: Device[] | undefined = undefined;
  noDevices = true;
  isLoading = true;
  isAllLoaded = false;


  constructor(private deviceService: DeviceService) {
  }


  ngOnInit(): void {
    this.deviceService.getLatestDevices().subscribe((devices) => {
      this.devices = devices;
      this.isLoading = false;
      if(this.devices.length !==0 ) {
        this.noDevices = false;
      }
    });
  }

loadAllDevices() {
    if(!this.isAllLoaded) {
this.deviceService.getAllDevices().subscribe((devices) => {
  this.devices = devices;
  this.isAllLoaded = true;
})
    }
}

}
