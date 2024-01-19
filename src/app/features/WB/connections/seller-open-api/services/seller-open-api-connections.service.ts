import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewOpenApiConnectionBody, OpenApiRefreshTokenBody } from '../models/seller-open-api.model';
import { MarketplaceConnectionModel } from '../../../../marketplace-connections/models/marketplace-connection.model';

@Injectable({
  providedIn: 'root'
})
export class SellerOpenApiConnectionsService {

  constructor(private httpClient : HttpClient) { }

  add(body : NewOpenApiConnectionBody){
    const path = `api/v1/wb/connections/seller/openapi`;

    return this.httpClient.post<MarketplaceConnectionModel>(path, body);
  }

  refreshToken(body : OpenApiRefreshTokenBody){
    const path = `api/v1/wb/connections/seller/openapi/refresh-token`;

    return this.httpClient.put<MarketplaceConnectionModel>(path, body);
  }
}
