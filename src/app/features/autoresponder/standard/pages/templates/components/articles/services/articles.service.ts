import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleCreateModel } from '../models/article.models';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private httpClient : HttpClient) { }

  updateRange(articles : string[], templateId : number){
    const path = `api/v1/autoresponder/standard/template/articles/update?templateId=${templateId}`;

    return this.httpClient.put(path, articles);
  }

  create(body : ArticleCreateModel) {
    const path = `api/v1/autoresponder/standard/template/article`;

    return this.httpClient.post(path, body);
  }

  delete(id : number){
    const path = `api/v1/autoresponder/standard/template/article?id=${id}`;

    return this.httpClient.delete(path);
  }
}
