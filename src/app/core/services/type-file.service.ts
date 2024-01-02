import { Injectable } from '@angular/core';
import { FileType } from '../enums/file-types';

@Injectable({
  providedIn: 'root'
})
export class TypeFileService {

  constructor() { }

  getAccept(type : FileType) : string | null{
    switch(type){
      case FileType.excel:
        return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      default:
        return null;
    }
  }
}
