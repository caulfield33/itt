import { Component, OnInit } from '@angular/core';
import {OcrProvider} from "../core/providers/ocr";
import {ElectronService} from "../core/services";
import {allowedImageExtension} from "../shared/consts";
import {ITag} from "../shared/interfaces/ITag";
import {ExcelManager} from "../core/utils/excel-manager";
import {NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pathToLoad: string = null;
  isLoading = false;
  progress: number = 0;
  foundImages: string[] = []
  customAllowedTypes: string = allowedImageExtension.map(img => `${img}`).join(', ')
  tags: ITag[] = []

  csv: ExcelManager = null;

  constructor(private ocrProvider: OcrProvider,
              private modal: NzModalService,
              private es: ElectronService) {}

  ngOnInit(): void {}

  addTangHandler(tags: ITag[]) {
    this.tags = tags
  }

  async selectHandler() {
    this.progress = 0;

    try {
      const {filePaths, canceled} = await this.es.remote.dialog.showOpenDialog({
        properties: [],
        filters: [
          { name: 'Images', extensions: allowedImageExtension },
        ]
      })
      this.pathToLoad = canceled ? null : filePaths[0]

      let files = await this.es.fs.readdirSync(this.pathToLoad)

      files = files
        .map(file => this.es.path.join(this.pathToLoad, file))
        .filter(file => {
          return this.es.isFile(file) && allowedImageExtension.includes(this.es.path.extname(file).replace('.', ''))
        })

      this.foundImages = files;
    } catch (e)  {
      this.pathToLoad = null
    }
  }

  async start() {
    this.csv = new ExcelManager(this.es)
    this.isLoading = true;
    this.progress = 0;

    try {
      for (let index = 0; index < this.foundImages.length; index++) {
        const {data: { text }} = await this.ocrProvider.convertImagePathToText(this.foundImages[index])

        const tags = [];

        this.tags.forEach(tag => {
          tag.keywords.forEach(keyword => {
            if (text.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())) tags.push(tag.name)
          })
        })

        if (this.pathToLoad === null) break;

        this.csv.appendRow({index: index + 1, path: this.foundImages[index], text, tags: tags.join(', ')})

        this.progress = index / this.foundImages.length * 100

      }

      this.progress = 100;

      if (this.pathToLoad !== null) {
        const modal = this.modal.create({
          nzTitle: 'Success!',
          nzContent: 'All images was successfully converted to text.',
          nzFooter: [
            {
              label: 'Save',
              type: 'primary',
              onClick: () =>  {
                this.csv.save()
                modal.destroy()
              }
            },
            {
              label: 'Cancel',
              type: 'default',
              onClick: () => modal.destroy()
            },
          ]
        });

      }
    } catch (e) {
      console.log(e)

      this.modal.error({
        nzTitle: 'Error!',
        nzContent: 'Some thing was wrong'
      })

      this.pathToLoad = null;
      this.csv = null;
    }

    this.isLoading = false;
  }

  close() {
    this.pathToLoad = null;
    this.csv = null;
  }

}
