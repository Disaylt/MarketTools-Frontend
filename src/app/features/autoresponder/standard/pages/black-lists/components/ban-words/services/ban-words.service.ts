import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BanWord } from '../models/ban-word';

@Injectable({
  providedIn: 'root'
})
export class BanWordsService {

  constructor(private httpClient : HttpClient) { }

  getRange(blackListId : number) {
    const path  = `api/v1/autoresponder/standard/black-list/ban-words?blackListId=${blackListId}`;

    return this.httpClient.get<BanWord[]>(path);
  }

  add(value : string, blackListId : number){
    const path = `api/v1/autoresponder/standard/black-list/ban-words?value=${value}&blackListId=${blackListId}`;

    return this.httpClient.post<BanWord>(path, null);
  }

  delete(id : number){
    const path = `api/v1/autoresponder/standard/black-list/ban-word?id=${id}`;

    return this.httpClient.delete(path);
  }
}
