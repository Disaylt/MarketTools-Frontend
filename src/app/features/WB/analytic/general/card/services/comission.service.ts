import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComissionRquestBody } from '../models/comission-request-body';

@Injectable({
  providedIn: 'root'
})
export class ComissionService {

  constructor(private httpClient : HttpClient) { }

  send(body : ComissionRquestBody){
    const path = "api/v1/analytic/general/card/comission"

    return this.httpClient.put(path, body);
  }
}
