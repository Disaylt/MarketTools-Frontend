import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarketplaceName } from '../../../core/enums/marketplace-name';
import { ActivateConnectionModel, BaseConnectionV2, NewConnectionDescriptionModel, NewSellecrConnection } from '../models/marketplace-connections-v2.models';
import { NewServiceStatus } from '../models/new-service-status.model';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceConnectionV2Service {

  constructor(private httpClient : HttpClient) { }

  getRange(marketplace : MarketplaceName){
    const path = `api/v1/marketplace-connections?Marketplace=${marketplace}`;
    
    return this.httpClient.get<BaseConnectionV2[]>(path);
  }

  create(body : NewSellecrConnection){
    const path = `api/v1/marketplace-connection`;

    return this.httpClient.post<BaseConnectionV2>(path, body);
  }

  delete(id : number){
    const path = `api/v1/marketplace-connection?id=${id}`;

    return this.httpClient.delete(path);
  }

  updateDescription(body : NewConnectionDescriptionModel){
    const path = `api/v1/marketplace-connection/description`;

    return this.httpClient.put(path, body);
  }

  activate(body: ActivateConnectionModel){
    const path = `api/v1/marketplace-connection/activate`;

    return this.httpClient.put(path, body);
  }

  changeServiceStatus(body : NewServiceStatus){
    const path = "api/v1/service";

    return this.httpClient.put(path, body);
  }
}
