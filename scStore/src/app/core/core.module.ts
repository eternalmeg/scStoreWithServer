import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {RouterLink} from "@angular/router";
import { AboutMeComponent } from './about-me/about-me.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        AboutMeComponent,

    ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,
        RouterLink
    ]

})
export class CoreModule { }
