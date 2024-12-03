import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from './cart/cart.component';
import {RouterLink} from "@angular/router";
import { SellerInfoComponent } from './seller-info/seller-info.component';


@NgModule({
  declarations: [
    CartComponent,
    SellerInfoComponent


  ],
  exports: [
    CartComponent,
    SellerInfoComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class FeaturesModule {
}
