import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComissionRquestBody } from '../models/comission-request-body';

@Injectable({
  providedIn: 'root'
})
export class ComissionService {

  constructor(private httpClient : HttpClient) { }

  send(body : ComissionRquestBody){
    const addHours = new Date().getTimezoneOffset() * -1;
    if(body.startDate){
      body.startDate.setMinutes(addHours);
    }

    if(body.endDate){
      body.endDate.setMinutes(addHours);
    }

    const path = "api/v1/analytic/general/card/comission"

    return this.httpClient.put(path, body);
  }
}
