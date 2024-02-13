import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarketplaceConnectionType } from '../../../core/enums/marketplace-connection.enum';
import { DescriptionUpdateBody, MarketplaceConnectionModel } from '../models/marketplace-connection.model';
import { MarketplaceName } from '../../../core/enums/marketplace-name';
import { ServicesName } from '../../../core/enums/services-name.enum';

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

    return this.httpClient.put(path, body);
  }

  getRangeByType(type : MarketplaceConnectionType, marketplace : MarketplaceName){
    const path = `api/v1/marketplace-connections?connectionType=${type}&marketplaceName=${marketplace}`;

    return this.httpClient.get<MarketplaceConnectionModel[]>(path);
  }

  getRangeByService(service : ServicesName, marketplace : MarketplaceName){
    const path = `api/v1/marketplace-connections?projectService=${service}&marketplaceName=${marketplace}`;

    return this.httpClient.get<MarketplaceConnectionModel[]>(path);
  }
}
