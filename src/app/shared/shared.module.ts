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
    NzInputModule, NzResultModule, NzTagModule, NzToolTipModule,
    NzWaveModule
} from "ng-zorro-antd";
import { TagsComponent } from './components/tags/tags.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ResultComponent } from './components/result/result.component';

@NgModule({
  declarations: [
    TablePreviewComponent,
    TagsComponent,
    ResultComponent
  ],
  exports: [
    TablePreviewComponent,
    TagsComponent,
    ResultComponent
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
        NzToolTipModule,
        NzResultModule
    ]
})
export class SharedModule { }
