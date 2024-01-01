import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MarketDeterminantService } from '../../../../../../core/services/market-determinant.service';
import { PaginationResult } from '../../../../../../core/models/pagination.model';
import { RecommendationProduct, RecommendationProductCreate, RecommendationProductDatails } from '../models/recommendation-product.model';

@Injectable({
  providedIn: 'root'
})
export class RecomendationProductsService {

  constructor(private httpClient : HttpClient, private marketPlaceService : MarketDeterminantService){}

  get(article : string, take : number, skip : number){
  const path = `api/v1/autoresponder/standard/recommendation-products?article=${article}&marketplaceName=${this.marketPlaceService.marketplace.nameEnum}&take=${take}&skip=${skip}`;

  return this.httpClient.get<PaginationResult<RecommendationProduct>>(path);
  }

  add(value : RecommendationProductDatails){
    const body : RecommendationProductCreate = value as RecommendationProductCreate;
    body.marketplaceName = this.marketPlaceService.marketplace.nameEnum;

    const path = "api/v1/autoresponder/standard/recommendation-product";

    return this.httpClient.post<RecommendationProduct>(path, body);
  }

  update(value : RecommendationProduct){
    const path = "api/v1/autoresponder/standard/recommendation-product";

    return this.httpClient.put(path, value);
  }

  delete(id : number){
    const path = `api/v1/autoresponder/standard/recommendation-product?id=${id}`;

    return this.httpClient.delete(path);
  }
}
