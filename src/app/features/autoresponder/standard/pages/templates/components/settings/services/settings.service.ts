import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsModel, SettingsUpdateModel } from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private httpClient : HttpClient) { }

  get(id : number){
    const path = `api/v1/autoresponder/standard/template/settings?id=${id}`;

    return this.httpClient.get<SettingsModel>(path);
  }

  update(body : SettingsUpdateModel){
    const path = `api/v1/autoresponder/standard/template/settings`;

    return this.httpClient.put(path, body);
  }
}
