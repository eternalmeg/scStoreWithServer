import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {HomeModule} from "./home/home.module";
import {UserModule} from "./user/user.module";
import {CatalogModule} from "./catalog/catalog.module";
import {SharedModule} from "./shared/shared.module";
import {appInterceptorProvider} from "./app.interseptor";
import {AuthenticateComponent} from './authenticate/authenticate.component';
import {FeaturesModule} from "./features/features.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ChatComponent} from "./features/chat/chat.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    AuthenticateComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    FormsModule,
    UserModule,
    HttpClientModule,
    CatalogModule,
    SharedModule,
    FeaturesModule,
    BrowserAnimationsModule,


  ],
  providers: [appInterceptorProvider],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
