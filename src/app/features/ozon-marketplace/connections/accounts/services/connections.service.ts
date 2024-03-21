import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewOzonSellerAccountConnectionModel } from '../models/new-connection.model';
import { MarketplaceConnectionModel } from '../../../../marketplace-connections/models/marketplace-connection.model';
import { UpdateRefreshTokenConnectionModel } from '../models/update-connection.model';

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
}
