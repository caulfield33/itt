import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import {
  NzBackTopModule,
  NzBreadCrumbModule,
  NzButtonModule, NzDescriptionsModule, NzEmptyModule, NzGridModule,
  NzIconModule,
  NzLayoutModule,
  NzMenuModule, NzProgressModule, NzResultModule, NzSpinModule, NzStatisticModule, NzTypographyModule, NzUploadModule
} from "ng-zorro-antd";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, NzButtonModule, NzLayoutModule, NzBreadCrumbModule, NzMenuModule, NzIconModule, NzBackTopModule, SharedModule, NzEmptyModule, NzUploadModule, NzDescriptionsModule, NzProgressModule, NzGridModule, NzStatisticModule, NzSpinModule, NzResultModule, NzTypographyModule]
})
export class HomeModule {}
