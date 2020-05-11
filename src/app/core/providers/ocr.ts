import { Injectable } from '@angular/core'
import {ElectronService} from "../services";
import {BehaviorSubject} from "rxjs";
import {UtilsService} from "../services/utils/utils.service";

@Injectable()
export class OcrProvider {

  private tesseract: any;
  private tesseractConfig = {
    lang: 'eng',
  }
  public logger = (event) => this.logs.next(event)


  public isTesseractLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public logs: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor(
    private utilsService: UtilsService,
    private es: ElectronService) {

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

    const base64 = this.utilsService.fromPathToBase64(imagePath)

    return this.tesseract.recognize(base64, this.tesseractConfig)
  }
}
