import { Component, OnInit } from '@angular/core';
import {OcrProvider} from "../core/providers/ocr";
import {ElectronService} from "../core/services";
import {allowedImageExtension} from "../shared/consts";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pathsToLoad: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private ocrProvider: OcrProvider,
              private es: ElectronService) {}

  ngOnInit(): void {}


  async selectHandler() {
    try {
      const {filePaths, canceled} = await this.es.remote.dialog.showOpenDialog({
        properties: ['multiSelections'],
        filters: [
          { name: 'Images', extensions: allowedImageExtension },
        ]
      })
      this.pathsToLoad.next(canceled ? [] : filePaths)
    } catch (e)  {
      console.log(e)

      this.pathsToLoad.next([])
    }
  }

}
