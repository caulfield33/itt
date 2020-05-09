import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import {
    NzBackTopModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule
} from "ng-zorro-antd";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, NzButtonModule, NzLayoutModule, NzBreadCrumbModule, NzMenuModule, NzIconModule, NzBackTopModule, SharedModule]
})
export class HomeModule {}
