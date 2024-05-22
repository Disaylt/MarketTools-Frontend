import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseConnectionV2 } from '../../../marketplace-connections/models/marketplace-connections-v2.models';
import { NewApiTypeModel } from '../models/new-api-type.model';

@Injectable({
  providedIn: 'root'
})
export class WbConnectionTypeService {

  constructor(private httpClient : HttpClient) { }

  updateApi(body : NewApiTypeModel){
    const path = "api/v1/marketplace-connection/wb/api";

    return this.httpClient.put<BaseConnectionV2>(path, body);
  }
}
