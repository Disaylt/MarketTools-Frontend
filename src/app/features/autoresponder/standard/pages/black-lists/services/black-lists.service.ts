import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlackListVm } from '../models/black-list.model';

@Injectable({
  providedIn: 'root'
})
export class BlackListsService {

  constructor(private httpClient : HttpClient) { }

  getRange() {
    const path  = "api/v1/autoresponder/standard/black-lists";

    return this.httpClient.get<BlackListVm[]>(path);
  }

  add(name : string){
    const path = `api/v1/autoresponder/standard/black-list?name=${name}`;

    return this.httpClient.post<BlackListVm>(path, null);
  }

  delete(id : number){
    const path = `api/v1/autoresponder/standard/black-lists?id=${id}`;

    return this.httpClient.delete(path);
  }
}
