import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BindPositionModel } from '../models/bind-position.model';
import { ColumnType } from '../../../../../../../../core/enums/columns-type.enum';

@Injectable({
  providedIn: 'root'
})
export class BindPositionsService {

  constructor(private httpClient : HttpClient) { }

  getRange(columnType : number, templateId : number){
    const path = `api/v1/autoresponder/standard/bind-positions?columnType=${columnType}&templateId=${templateId}`;

    return this.httpClient.get<BindPositionModel[]>(path);
  }

  updateRange(columnType : number, templateId : number, body : BindPositionModel[]){
    const path = `api/v1/autoresponder/standard/bind-positions?columnType=${columnType}&templateId=${templateId}`;

    return this.httpClient.put(path, body);
  }
}
