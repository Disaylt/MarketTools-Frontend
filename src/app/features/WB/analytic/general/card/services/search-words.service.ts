import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchWordVm } from '../../cards/models/search-word.model';

@Injectable({
  providedIn: 'root'
})
export class SearchWordsService {

  constructor(private httpClient : HttpClient) { }

  addWord(cardId : number, name : string){
    const path = `api/v1/analytic/general/card/searchword`;
    const body = {
      cardId : cardId,
      value : name
    };

    return this.httpClient.post<SearchWordVm>(path, body);
  }

  delete(id : number){
    const path = `api/v1/analytic/general/card/searchword?id=${id}`;

    return this.httpClient.delete(path);
  }
}
