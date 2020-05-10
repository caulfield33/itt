import { Injectable } from '@angular/core';
import {ElectronService} from "..";
import {allowedImageExtension} from "../../../shared/consts";

type pass = any[];
type fail = any[];

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private es: ElectronService
  ) { }

  fromPathToBase64(imagePath: string): string {
    const base64 = this.es.fs.readFileSync(imagePath).toString('base64')
    const extension = imagePath.split(".")

    if (allowedImageExtension.includes(extension[extension.length -1].toLocaleLowerCase())) {
      return `data:image/${extension[extension.length -1].toLocaleLowerCase()};base64,` + base64;
    }

    return null;
  }

  chunk(array: any[], chunkSize: number): [] {
    return [].concat.apply([],
      array.map(function(elem, i) {
        return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
      })
    );
  }

  partition(array: any[], isValid: Function): [pass, fail] {
    return array.reduce(([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    }, [[], []]);
  }
}
