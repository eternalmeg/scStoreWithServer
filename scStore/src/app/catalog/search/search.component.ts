import { Component } from '@angular/core';
import {DeviceService} from "../device.service";
import {Device} from "../../types/device";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery: string = '';
  devices: Device[] = [];

  constructor(private deviceService: DeviceService) {}

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.deviceService.searchDevice(this.searchQuery).subscribe({
        next: (results) => {
          this.devices = results;
          this.searchQuery = '';
        },
        error: (err) => {
          console.error('Error fetching search results', err);
        }
      });
    } else {
      this.devices = [];
    }
  }
}
