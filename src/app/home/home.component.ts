import { Component, OnInit } from '@angular/core';
import {OcrProvider} from "../core/providers/ocr";
import {ElectronService} from "../core/services";
import {allowedImageExtension} from "../shared/consts";
import {BehaviorSubject, Observable, Observer, Subscription} from "rxjs";
import {ITag} from "../shared/interfaces/ITag";
import {IResultAction} from "../shared/interfaces/IResultAction";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pathToLoad: string = null;
  status: 'wip' | 'done' = 'wip';
  isLoading = false;

  foundImages: number = 21313
  customAllowedTypes: string = allowedImageExtension.map(img => `${img}`).join(',')
  tags: ITag[] = []


  constructor(private ocrProvider: OcrProvider,
              private es: ElectronService) {}

  ngOnInit(): void {}

  addTangHandler(tags: ITag[]) {
    this.tags = tags
  }

  async resultActionHandler(action: IResultAction) {
    console.log(action)
    switch (action.type) {
      case "again":
      case "pick":
        await this.selectHandler()
        break;
      case "save":
      default:
        break;
    }
    this.status = "done";
  }

  async selectHandler() {
    try {
      const {filePaths, canceled} = await this.es.remote.dialog.showOpenDialog({
        properties: [],
        filters: [
          { name: 'Images', extensions: allowedImageExtension },
        ]
      })
      this.pathToLoad = canceled ? null : filePaths[0]
    } catch (e)  {
      console.log(e)
      this.pathToLoad = null
    }
  }

  start() {
    this.status = "done";
  }

  close() {
    this.pathToLoad = null
  }

}
