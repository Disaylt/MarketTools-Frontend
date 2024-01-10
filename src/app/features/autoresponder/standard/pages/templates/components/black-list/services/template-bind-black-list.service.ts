import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplateBindBlackListService {

  constructor(private httpClient : HttpClient) { }

  bind(blackListId : number, templateId : number){
    const path = `api/v1/autoresponder/standard/template/black-list?blackListId=${blackListId}&templateId=${templateId}`;

    return this.httpClient.put(path, null);
  }
}
