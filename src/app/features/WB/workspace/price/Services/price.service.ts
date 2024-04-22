import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PriceDetailsResult } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private httpClient : HttpClient) { }

  getRange(connectionId : number){
    const path = `api/v1/workspace/price?connectionId=${connectionId}`;

    return this.httpClient.get<PriceDetailsResult>(path);
  }
}
