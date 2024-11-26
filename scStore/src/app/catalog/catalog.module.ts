import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';
import {DeviceService} from "./device.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {FeaturesModule} from "../features/features.module";
import { SearchComponent } from './search/search.component';



@NgModule({
    declarations: [
        CatalogComponent,
        DetailsComponent,
        SearchComponent,

    ],
  exports: [
    CatalogComponent,
    DetailsComponent,
    SearchComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    SharedModule,
    FeaturesModule,

  ]
})
export class CatalogModule { }
