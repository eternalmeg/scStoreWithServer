import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import {AppMatchPasswordsDirective} from "./directives/app-match-passwords.directive";
import {ErrorMessageComponent} from "./error-message/error-message.component";
import { ErrorPageComponent } from './error-page/error-page.component';
import {RouterLink} from "@angular/router";
import {TimeFormatPipe} from "./pipes/time-format.pipe";


@NgModule({
  declarations: [
    LoaderComponent,
    AppMatchPasswordsDirective,
    ErrorMessageComponent,
    ErrorPageComponent,
    LoaderComponent,
    TimeFormatPipe,

  ],
  exports: [
    AppMatchPasswordsDirective,
    ErrorMessageComponent,
    ErrorPageComponent,
    LoaderComponent,
    TimeFormatPipe
  ],
    imports: [
        CommonModule,
        RouterLink
    ]
})
export class SharedModule { }
