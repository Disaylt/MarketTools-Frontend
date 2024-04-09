import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BotModel } from '../models/bot.model';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  constructor(private httpClient : HttpClient) { }

  getInfo(id : number){
    const path = `api/v1/telegram/bot?id=${id}`;

    return this.httpClient.get<BotModel>(path);
  }
}
