import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PriceDetailsResult } from '../models/result.model';
import { SizeSendModel } from '../models/size-send.model';
import { ProductSendModel } from '../models/product-send.model';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private httpClient : HttpClient) { }

  getRange(connectionId : number){
    const path = `api/v1/workspace/price?connectionId=${connectionId}`;

    return this.httpClient.get<PriceDetailsResult>(path);
  }

  sendSizes(connectionId : number, sizes : SizeSendModel[]){
    const path = `api/v1/workspace/price/sizes`;
    const body = { connectionId : connectionId, sizes : sizes};

    return this.httpClient.post(path, body);
  }

  sendProducts(connectionId : number, products : ProductSendModel[]){
    const path = `api/v1/workspace/price/products`;
    const body = { connectionId : connectionId, products : products};

    return this.httpClient.post(path, body);
  }
}
