import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ElectronService} from "../../../core/services";
import {UtilsService} from "../../../core/services/utils/utils.service";
import {IImageTableData, IImageTableRow} from "../../interfaces/IImageTableData";
import {allowedImageExtension} from "../../consts";

@Component({
  selector: 'app-table-preview',
  templateUrl: './table-preview.component.html',
  styleUrls: ['./table-preview.component.scss']
})
export class TablePreviewComponent implements OnInit {

  @Input() pathsToLoad: BehaviorSubject<string[]>

  imagesTableData: IImageTableData = null;

  constructor(
    private es: ElectronService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.pathsToLoad.subscribe(paths => {
      if (paths.length > 0) {
        if (paths.length === 1 && this.es.isFile(paths[0])) {
          console.log('single', paths);

          this.imagesTableData = {
            selectedFolder: this.tableRow(paths),
            folders: null
          }

        } else if (paths.length === 1 && !this.es.isFile(paths[0])) {
          console.log('single folder', paths);
          const files = this.es.fs.readdirSync(paths[0], { encoding: 'utf8' });
          const row = this.tableRow(files, paths[0])
          console.log(row);

        } else {
          const [files, folders] = this.utilsService.partition(paths, (p) => this.es.isFile(p))

          const folderRows = folders.map(folder => this.tableRow(files, folder))

          this.imagesTableData = {
            selectedFolder: this.tableRow(files),
            folders: folderRows as IImageTableRow[]
          }
        }
      }
    })
  }

  private tableRow(files: string[], folderPath?: string ): IImageTableRow {

    const images = files.filter(file => {
      return allowedImageExtension.includes(
        this.es.path.extname(file).replace('.', '').toLocaleLowerCase()
      )
    }).map(image => this.utilsService.fromPathToBase64(image))

    return files.length > 0 ? {
      folderPath: folderPath ? folderPath : this.es.path.dirname(files[0]),
      images: this.utilsService.chunk(images, 6)
    } : null;
  }

}
