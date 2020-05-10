import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TablePreviewComponent} from "./components/table-preview/table-preview.component";
import {
  NzButtonModule,
  NzCardModule,
  NzDividerModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule, NzTagModule, NzToolTipModule,
  NzWaveModule
} from "ng-zorro-antd";
import { TagsComponent } from './components/tags/tags.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    TablePreviewComponent,
    TagsComponent
  ],
    exports: [
        TablePreviewComponent,
        TagsComponent
    ],
  imports: [
    CommonModule,
    NzDividerModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzWaveModule,
    FormsModule,
    ReactiveFormsModule,
    NzCardModule,
    NzButtonModule,
    NzTagModule,
    NzToolTipModule
  ]
})
export class SharedModule { }
