type ImageTableRow = string[]

export interface IImageTableRow  {
  images: ImageTableRow[];
  folderPath: string
}

export interface IImageTableData {
  selectedFolder: IImageTableRow;
  folders: IImageTableRow[];
}
