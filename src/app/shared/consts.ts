import {ISaveOptions} from "./interfaces/ISaveOptions";

export const saveOptions: ISaveOptions = {
  title: "Save file",
  buttonLabel : "Save",
  defaultPath: `Converted Data.xlsx`,
  filters :[
    {name: 'Excel', extensions: ['xlsx']},
  ]
}
