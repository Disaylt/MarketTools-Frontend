import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TelegramService, TelegramUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TelegramUsersService {

  constructor(private httpClient : HttpClient) { }

  getRange(botId : number){
    const path = `api/v1/telegram/users?botId=${botId}`;

    return this.httpClient.get<TelegramUser[]>(path);
  }

  delete(id : number){
    const path = `api/v1/telegram/user?id=${id}`;

    return this.httpClient.delete(path);
  }

  addService(userId : number, serviceType : number){
    const body = {
      userId : userId,
      serviceType : serviceType
    }
    const path = "api/v1/telegram/user/service";

    return this.httpClient.post<TelegramService>(path, body);
  }

  deleteService(id : number){
    const path = `api/v1/telegram/user/service?id=${id}`;

    return this.httpClient.delete(path);
  }
}
