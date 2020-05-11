import * as Excel from 'exceljs';
import {IConvertedImageRow} from "../../shared/interfaces/IConvertedImageRow";
import {saveOptions} from "../../shared/consts";
import {ElectronService} from "../services";
import {ISaveOptions} from "../../shared/interfaces/ISaveOptions";

export class ExcelManager {

  private workbook;
  private convertedSheet;

  constructor(private es: ElectronService) {

    this.workbook = new Excel.Workbook();

    this.workbook.creator = 'ITT - Image to text app.';
    this.workbook.lastModifiedBy = '';
    this.workbook.created = new Date();
    this.workbook.modified = new Date();

    this.convertedSheet = this.workbook.addWorksheet('Converted');

    this.convertedSheet.columns = [
      { header: 'Index', key: 'index', width: 10},
      { header: 'Image path', key: 'path',width: 30 },
      { header: 'Text', key: 'text', width: 60 },
      { header: 'Tags', key: 'tags', width: 30 }
    ]

  }

  public appendRow(convertedImageRow: IConvertedImageRow) {
    this.convertedSheet.addRow(convertedImageRow);
  }

  public async save(options: ISaveOptions = saveOptions): Promise<boolean> {
    const { filePath, canceled } = await this.es.remote.dialog.showSaveDialog(options)

    return new Promise<boolean>( (resolve, reject) => {
      if (canceled) {
        reject(false)
      } else {
        this.workbook.xlsx.writeBuffer().then(data => {
          this.es.fs.writeFile(filePath, data, {}, e => {
            console.log(e)
           e === null ? resolve(true) : reject(false)
          });
        });
      }
    })
  }

}
