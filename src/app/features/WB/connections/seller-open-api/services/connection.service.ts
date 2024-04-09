import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewWbSellerApiConnectionModel } from '../models/new-connection.model';
import { MarketplaceConnectionModel } from '../../../../marketplace-connections/models/marketplace-connection.model';
import { WbSellerApiUpdateTokenConnectionModel } from '../models/update-token-connection.model';

@Injectable({
  providedIn: 'root'
})
export class WbSellerApiConnectionService {

  constructor(private httpClient : HttpClient) { }

  create(body : NewWbSellerApiConnectionModel)
  {
    const path = "api/v1/connections/wb/seller/api";

    return this.httpClient.post<MarketplaceConnectionModel>(path, body);
  }

  updateToken(body : WbSellerApiUpdateTokenConnectionModel){
    const path = "api/v1/connections/wb/seller/api/token";
    
    return this.httpClient.put<MarketplaceConnectionModel>(path, body);
  }
}
