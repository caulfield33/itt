import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import {NzBreadCrumbModule, NzButtonModule, NzIconModule, NzLayoutModule, NzMenuModule} from "ng-zorro-antd";

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, NzButtonModule, NzLayoutModule, NzBreadCrumbModule, NzMenuModule, NzIconModule]
})
export class HomeModule {}
