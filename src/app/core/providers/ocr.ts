import { Injectable } from '@angular/core'
import {ElectronService} from "../services";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class OcrProvider {

  private tesseract: any;
  private tesseractConfig = {
    lang: 'eng',
  }
  public logger = (event) => this.logs.next(event)


  public isTesseractLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public logs: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor(private es: ElectronService) {

    this.init();
  }

  private async init() {
    this.tesseract = (window as any).tesseractWorker(this.logger);

    await this.tesseract.load();
    await this.tesseract.loadLanguage('eng');
    await this.tesseract.initialize('eng');

    this.isTesseractLoaded.next(true)
}

  convertImagePathToText(imagePath: string): Promise<any>  {
    const extension = imagePath.split(".")
    const base64 = this.es.fs.readFileSync(imagePath).toString('base64')

    return this.tesseract.recognize(
      `data:image/${extension[extension.length -1].toLocaleLowerCase()};base64,` + base64,
      this.tesseractConfig
    )
  }
}
