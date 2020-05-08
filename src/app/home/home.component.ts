import { Component, OnInit } from '@angular/core';
import {OcrProvider} from "../core/providers/ocr";
import {ElectronService} from "../core/services";
const { dialog } = require('electron').remote

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isReady =false;

  constructor(private ocrProvider: OcrProvider, private electronService: ElectronService) { }

  ngOnInit(): void {
    this.ocrProvider.isTesseractLoaded.subscribe(res => {
      this.isReady = true
    })

    this.ocrProvider.logs.subscribe(log => {
      console.log(log)
    })
  }

  test() {
    dialog.showOpenDialog({
    }).then(result => {
      console.log(result.canceled)
      console.log(result.filePaths)
      if (this.isReady) {
        this.ocrProvider.convertImagePathToText(result.filePaths[0])
          .then((e) => console.log(e))
      }

    }).catch(err => {
      console.log(err)
    })
  }

}
