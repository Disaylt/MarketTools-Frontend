import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnalyticCardModel, CardModel } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private httpClient : HttpClient) { }

  getAll(connectionId : number){
    const path = `api/v1/analytic/general/cards?connectionId=${connectionId}`;
    
    return this.httpClient.get<CardModel[]>(path);
  }

  get(id : number, startDate : Date, endDate : Date){
    const path = `api/v1/analytic/general/card?id=${id}&startDate=${startDate.toDateString()}&endDate=${endDate.toDateString()}`;
    
    return this.httpClient.get<AnalyticCardModel>(path);
  }
}
