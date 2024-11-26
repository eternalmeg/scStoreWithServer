import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from './cart/cart.component';
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    CartComponent


  ],
  exports: [
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class FeaturesModule {
}
