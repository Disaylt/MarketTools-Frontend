import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cell, NewCell } from '../models/cell.model';

@Injectable({
  providedIn: 'root'
})
export class CellsService {

  constructor(private httpClient : HttpClient) { }

  create(body : NewCell){
    const path = "api/v1/autoresponder/standard/cell";

    return this.httpClient.post<Cell>(path, body);
  }

  delete(id : number){
    const path = `api/v1/autoresponder/standard/cell?id=${id}`;

    return this.httpClient.delete(path);
  }

  change(body : Cell){
    const path = "api/v1/autoresponder/standard/cell";

    return this.httpClient.put<Cell>(path, body);
  }

  getRange(columnId : number){
    const path = `api/v1/autoresponder/standard/cells?columnId=${columnId}`;

    return this.httpClient.get<Cell[]>(path);
  }
}
