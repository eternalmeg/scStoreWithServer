import { Component } from '@angular/core';
import {DeviceService} from "../../catalog/device.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent {

  constructor(private deviceService: DeviceService, private router: Router) {
  }

  submitHandler(form: NgForm) {
    if(form.invalid) {
      return;
    }
    const{brand, model, image, description, price} = form.value;
    this.deviceService.createDevice(brand, model,image, description, price).subscribe(()=> {
      this.router.navigate(["/home"])
    })

  }

}
