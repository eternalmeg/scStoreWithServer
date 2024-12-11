import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home/home.component";
import {LoginComponent} from "./user/login/login.component";
import {RegisterComponent} from "./user/register/register.component";
import {ProfileComponent} from "./user/profile/profile.component";
import {EditOfferComponent} from "./user/edit-offer/edit-offer.component";
import {OfferComponent} from "./user/offer/offer.component";
import {CatalogComponent} from "./catalog/catalog/catalog.component";
import {DetailsComponent} from "./catalog/details/details.component";
import {ErrorPageComponent} from "./shared/error-page/error-page.component";
import {UserOffersComponent} from "./user/user-offers/user-offers.component";
import {CartComponent} from "./features/cart/cart.component";
import {SearchComponent} from "./catalog/search/search.component";
import { AuthActivate } from "./core/guards/auth.guard";
import {SellerInfoComponent} from "./features/seller-info/seller-info.component";
import {AuthGuard} from "./core/guards/guest.guard";
import {EditDeviceGuard} from "./core/guards/owner.guard";
import {AboutMeComponent} from "./core/about-me/about-me.component";



const routes: Routes = [
  {path: '',redirectTo: '/home', pathMatch: "full"},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'my-profile', component: ProfileComponent, canActivate: [AuthActivate]},
  {path: 'create-offer', component: OfferComponent, canActivate: [AuthActivate]},
  {path: 'edit-offer/:id', component: EditOfferComponent, canActivate: [EditDeviceGuard]},
  {path: 'my-offers', component: UserOffersComponent, canActivate: [AuthActivate]},
  {path: 'catalog', component: CatalogComponent},
  {path: 'device-details/:id', component: DetailsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'seller-info', component: SellerInfoComponent},
  {path: 'search', component:SearchComponent},
  {path: 'about-me', component: AboutMeComponent},
  {path: '404', component: ErrorPageComponent},
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
