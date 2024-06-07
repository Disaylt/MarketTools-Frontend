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
    const addHours = new Date().getTimezoneOffset() * -1;
    startDate.setMinutes(addHours);
    endDate.setMinutes(addHours);
    const path = `api/v1/analytic/general/card?id=${id}&startDate=${startDate.toUTCString()}&endDate=${endDate.toUTCString()}`;
    return this.httpClient.get<AnalyticCardModel>(path);
  }

  combineStatus(value : boolean, id : number){
    const body = {isCombine : value, id : id}
    const path = "api/v1/analytic/general/card/combine-optio"

    return this.httpClient.put(path, body);
  }
}
