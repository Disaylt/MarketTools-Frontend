import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {

  constructor(private httpClient : HttpClient) { }

  updateActiveStatus(id : number, isActie : boolean){
    const path = "api/v1/autoresponder/standard/connection/status";

    return this.httpClient.put(path, null);
  }
}
