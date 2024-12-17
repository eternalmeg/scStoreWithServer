import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from './cart/cart.component';
import {RouterLink} from "@angular/router";
import { SellerInfoComponent } from './seller-info/seller-info.component';
import { ChatComponent } from './chat/chat.component';
import {FormsModule} from "@angular/forms";
import { MailboxComponent } from './mailbox/mailbox.component';


@NgModule({
  declarations: [
    CartComponent,
    SellerInfoComponent,
    ChatComponent,
    MailboxComponent


  ],
  exports: [
    CartComponent,
    SellerInfoComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ]
})
export class FeaturesModule {
}
