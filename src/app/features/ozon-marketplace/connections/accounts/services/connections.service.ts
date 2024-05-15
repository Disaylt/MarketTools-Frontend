import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewOzonSellerAccountConnectionModel } from '../models/new-connection.model';
import { MarketplaceConnectionModel } from '../../../../marketplace-connections/models/marketplace-connection.model';
import { UpdateRefreshTokenConnectionModel } from '../models/update-connection.model';
import { NewConnectionType } from '../models/new-connection-type.model';
import { BaseConnectionV2 } from '../../../../marketplace-connections/models/marketplace-connections-v2.models';

@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {

  constructor(private httpClient : HttpClient) { }

  create(body : NewOzonSellerAccountConnectionModel){
    const path = "api/v1/connections/ozon/seller/account";

    return this.httpClient.post<MarketplaceConnectionModel>(path, body);
  }

  updateToken(body : UpdateRefreshTokenConnectionModel){
    const path = "api/v1/connections/ozon/seller/account/refresh-token";

    return this.httpClient.put<MarketplaceConnectionModel>(path, body);
  }

  changeAaccountType(body : NewConnectionType){
    const path = "api/v1/marketplace-connection/ozon/account";

    return this.httpClient.put<BaseConnectionV2>(path, body);
  }
}
