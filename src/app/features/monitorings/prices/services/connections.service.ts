import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsModel, SettingsUpdateModel } from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {

  constructor(private httpClient : HttpClient) { }

  updateActiveStatus(id : number, isActive : boolean){
    const path = `api/v1/monitoring/price/connection/status?connectionId=${id}&isActive=${isActive}`;

    return this.httpClient.put(path, null);
  }

  getSettings(id :number){
    const path = `api/v1/monitoring/price/connection/settings?connectionId=${id}`; 

    return this.httpClient.get<SettingsModel>(path);
  }

  updateSettings(settings : SettingsUpdateModel){
    const path = `api/v1/monitoring/price/connection/settings`; 

    return this.httpClient.put<SettingsModel>(path, settings);
  }

}
