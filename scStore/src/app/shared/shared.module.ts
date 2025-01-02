import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import {AppMatchPasswordsDirective} from "./directives/app-match-passwords.directive";
import {ErrorMessageComponent} from "./error-message/error-message.component";
import { ErrorPageComponent } from './error-page/error-page.component';
import {RouterLink} from "@angular/router";
import {TimeFormatPipe} from "./pipes/time-format.pipe";
import { NoSpacesOrTabsDirective } from './directives/no-spaces-or-tabs.directive';
import { NoScriptsDirective } from './directives/no-scripts.directive';


@NgModule({
  declarations: [
    LoaderComponent,
    AppMatchPasswordsDirective,
    ErrorMessageComponent,
    ErrorPageComponent,
    LoaderComponent,
    TimeFormatPipe,
    NoSpacesOrTabsDirective,
    NoScriptsDirective,

  ],
    exports: [
        AppMatchPasswordsDirective,
        ErrorMessageComponent,
        ErrorPageComponent,
        LoaderComponent,
        TimeFormatPipe,
        NoSpacesOrTabsDirective,
        NoScriptsDirective
    ],
    imports: [
        CommonModule,
        RouterLink
    ]
})
export class SharedModule { }
