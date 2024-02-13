import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationModel, TotalNotifications } from '../models/notification.model';
import { PaginationResult } from '../../../../core/models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private httpClient : HttpClient) { }

  getRange(take : number, skip : number, isRead : boolean | null = null){
    let path = `api/v1/user/notifications?take=${take}&skip=${skip}&`;
    if(isRead != null){
      path += `isRead=${isRead}`;
    }

    return this.httpClient.get<PaginationResult<NotificationModel>>(path);
  }

  count(isRead : boolean | null = null){
    let path = "api/v1/user/notifications/count?"
    if(isRead != null){
      path += `isRead=${isRead}`
    }

    return this.httpClient.get<TotalNotifications>(path);
  }

  readAll(){
    const path = "api/v1/user/notifications/read-all";

    return this.httpClient.put(path, null);
  }
}
