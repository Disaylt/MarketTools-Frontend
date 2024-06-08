import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CostPriceRequestBody } from '../models/cosst-price-request-body';

@Injectable({
  providedIn: 'root'
})
export class CostPriceService {

  constructor(private httpClient : HttpClient) { }

  sendByCard(body : CostPriceRequestBody){
    const addHours = new Date().getTimezoneOffset() * -1;
    if(body.startDate){
      body.startDate.setMinutes(addHours);
    }

    if(body.endDate){
      body.endDate.setMinutes(addHours);
    }

    const path = "api/v1/analytic/general/card/price"

    return this.httpClient.put(path, body);
  }

  sendBySize(body : CostPriceRequestBody){
    const addHours = new Date().getTimezoneOffset() * -1;
    if(body.startDate){
      body.startDate.setMinutes(addHours);
    }

    if(body.endDate){
      body.endDate.setMinutes(addHours);
    }

    const path = "api/v1/analytic/general/card/size/price"

    return this.httpClient.put(path, body);
  }
}
