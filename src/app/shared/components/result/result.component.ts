import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IResultAction} from "../../interfaces/IResultAction";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {

  @Input() status: 'success' | 'error';
  @Input() title: string;
  @Input() subTitle: string;

  @Output() actionHandler: EventEmitter<IResultAction> = new EventEmitter<IResultAction>()

  constructor() { }

  buttonHandler(action: string ) {
    this.actionHandler.emit({type: action} as IResultAction)
  }

}
