import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColumnType } from '../../../../columns/models/column-type.model';
import { ColumnTypeStorage } from '../../../../columns/constants/column-types.storage';
import { BindPositionModel } from '../models/bind-position.model';

@Injectable({
  providedIn: 'root'
})
export class BindPositionsService {

  constructor(private httpClient : HttpClient) { }

  getRange(columnType : ColumnType, templateId : number){
    const path = `api/v1/autoresponder/standard/bind-positions?columnType=${columnType.id}&templateId=${templateId}`;

    return this.httpClient.get<BindPositionModel[]>(path);
  }

  updateRange(columnType : ColumnType, templateId : number, body : BindPositionModel[]){
    const path = `api/v1/autoresponder/standard/bind-positions?columnType=${columnType.id}&templateId=${templateId}`;

    return this.httpClient.put(path, body);
  }
}
