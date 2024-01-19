import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarketplaceConnectionType } from '../../../core/enums/marketplace-connection.enum';
import { DescriptionUpdateBody, MarketplaceConnectionModel } from '../models/marketplace-connection.model';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceConnectionsService {

  constructor(private httpClient : HttpClient) { }

  delete(id : number){
    const path = `api/v1/marketplace-connection?id=${id}`;

    return this.httpClient.delete(path);
  }

  updateDescription(body : DescriptionUpdateBody){
    const path = "api/v1/marketplace-connection/description";

    return this.httpClient.put<MarketplaceConnectionModel>(path, body);
  }

  getRange(type : MarketplaceConnectionType, skip : number, take : number){
    const path = `api/v1/marketplace-connections?connectionType=${type}&take=${take}&skip=${skip}`;

    return this.httpClient.get<MarketplaceConnectionModel[]>(path);
  }
}
