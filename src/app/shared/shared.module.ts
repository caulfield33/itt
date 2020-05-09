import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TablePreviewComponent} from "./components/table-preview/table-preview.component";
import {NzDividerModule, NzGridModule} from "ng-zorro-antd";



@NgModule({
  declarations: [
    TablePreviewComponent
  ],
  exports: [
    TablePreviewComponent
  ],
  imports: [
    CommonModule,
    NzDividerModule,
    NzGridModule
  ]
})
export class SharedModule { }
