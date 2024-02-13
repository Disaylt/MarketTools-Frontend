import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RatingModel } from '../models/rating.model';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private httpClient : HttpClient) { }

  getRatings(connectionId : number){
    const path = `api/v1/autoresponder/standard/connection/ratings?connectionId=${connectionId}`;

    return this.httpClient.get<RatingModel[]>(path);
  }

  add(rating : number, connectionId : number){
    const path = `api/v1/autoresponder/standard/connection/rating?rating=${rating}&connectionId=${connectionId}`;

    return this.httpClient.post(path, null);
  }

  addTemplate(rating : number, connectionId : number, templateId : number){
    const path = `api/v1/autoresponder/standard/connection/rating/template?rating=${rating}&connectionId=${connectionId}&templateId=${templateId}`;

    return this.httpClient.post(path, null);
  }

  delete(rating : number, connectionId : number){
    const path = `api/v1/autoresponder/standard/connection/rating?rating=${rating}&connectionId=${connectionId}`;

    return this.httpClient.delete(path);
  }

  deleteTemplate(rating : number, connectionId : number, templateId : number){
    const path = `api/v1/autoresponder/standard/connection/rating/template?rating=${rating}&connectionId=${connectionId}&templateId=${templateId}`;

    return this.httpClient.delete(path);
  }
}
