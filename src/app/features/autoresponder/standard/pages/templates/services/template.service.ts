import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewTemplate, Template } from '../models/template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private httpClient : HttpClient) { }

  getRange(){
    const path = "api/v1/autoresponder/standard/templates"

    return this.httpClient.get<Template[]>(path);
  }

  add(newTemplate : NewTemplate){
    const path = "api/v1/autoresponder/standard/template"

    return this.httpClient.post<Template>(path, newTemplate);
  }

  delete(id : number){
    const path = `api/v1/autoresponder/standard/template?id=${id}`;

    return this.httpClient.delete(path);
  }
}
