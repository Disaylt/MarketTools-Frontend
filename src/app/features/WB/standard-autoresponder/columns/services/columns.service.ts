import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewColumn } from '../models/column.models';

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {

  constructor(private httpClient : HttpClient) { }

  getRange(type : number){
    const path = `api/v1/autoresponder/standard/columns?type=${type}`;

    return this.httpClient.get(path);
  }

  add(body : NewColumn){
    const path = "api/v1/autoresponder/standard/column";

    return this.httpClient.post(path, body);
  }

  deleteColumn(id : number){
    const path = `api/v1/autoresponder/standard/column?id=${id}`;

    return this.httpClient.delete(path);
  }

}
