import { Component, OnInit } from '@angular/core';
import {OcrProvider} from "../core/providers/ocr";
import {ElectronService} from "../core/services";
import {ExcelManager} from "../core/utils/excel-manager";
import {saveOptions} from "../shared/consts";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isReady = false;
  excel: ExcelManager = new ExcelManager(this.es)

  constructor(private ocrProvider: OcrProvider,
              private es: ElectronService) {
  }

  ngOnInit(): void {
    this.ocrProvider.isTesseractLoaded.subscribe(res => {
      this.isReady = true
    })

    this.ocrProvider.logs.subscribe(log => {
      console.log(log)
    })

    // this.excel.appendRow({index: 0, path: 'ok', text: 'asdasd', tags: 'dasdasd'})
    // this.excel.appendRow({index: 0, path: 'ok', text: 'asdasd', tags: 'dasdasd'})
    // this.excel.appendRow({index: 0, path: 'ok', text: 'asdasd', tags: 'dasdasd'})
    // this.excel.appendRow({index: 0, path: 'ok', text: 'asdasd', tags: 'dasdasd'})
    // this.excel.appendRow({index: 0, path: 'ok', text: 'asdasd', tags: 'dasdasd'})
    // this.excel.appendRow({index: 0, path: 'ok', text: 'asdasd', tags: 'dasdasd'})
    // this.excel.save({
    //   ...saveOptions,
    //   defaultPath: 'tex111t.xlsx'
    // })
  }


  test() {
    this.es.remote.dialog.showOpenDialog({
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
