import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {OfferComponent} from './offer/offer.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import { EditOfferComponent } from './edit-offer/edit-offer.component';
import {Router, RouterLink} from "@angular/router";
import { UserOffersComponent } from './user-offers/user-offers.component';
import {FeaturesModule} from "../features/features.module";



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    OfferComponent,
    ProfileComponent,
    EditOfferComponent,
    UserOffersComponent
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    OfferComponent,
    ProfileComponent,
    EditOfferComponent,
    UserOffersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterLink,
    FeaturesModule,
  ]
})
export class UserModule {
}
