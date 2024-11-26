import {Component, OnInit, ViewChild} from '@angular/core';
import {Device} from "../../types/device";
import {DeviceService} from "../../catalog/device.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit{

  @ViewChild('form') form: NgForm | undefined;

  deviceId = this.activatedRoute.snapshot.params["id"];

  constructor(private deviceService: DeviceService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.deviceService.getDevice(this.deviceId).subscribe((device) => {
      const {brand, model, image, description, price} = device;
      this.form?.setValue({brand, model, image, description, price})
    })
  }

  submitHandler() {
    if (this.form?.invalid) {
      return
    }
    const {brand, model, image, description, price} = this.form?.value;
    this.deviceService.editDevice(this.deviceId, brand,model,image,description,price).subscribe(()=> {
      this.router.navigate([`/device-details/${this.deviceId}`]);
    })
  }


}
