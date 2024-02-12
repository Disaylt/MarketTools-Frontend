import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportModel } from '../models/report.model';
import { PaginationResult } from '../../../../../../core/models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private httpClient : HttpClient) { }

  getRange(take : number, 
    skip : number, 
    connectionId : number | null = null,
    rating : number | null = null,
    isSuccess : number | null = null,
    article : string | null = null){
      let path = `api/v1/autoresponder/standard/reports?take=${take}&skip=${skip}&`
      if(rating != null){
        path += `rating=${rating}&`
      }
      if(isSuccess != null){
        path += `isSuccess=${isSuccess}&`
      }
      if(article != null){
        path += `article=${article}&`
      }
      if(connectionId != null){
        path += `connectionId=${connectionId}&`
      }

      return this.httpClient.get<PaginationResult<ReportModel>>(path);
    }
}
