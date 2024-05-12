import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArchitectureModel } from '../models/architecture.model';
import { MarketplaceName } from '../../../core/enums/marketplace-name';

@Injectable({
  providedIn: 'root'
})
export class ArchitectureService {

  constructor(private httpClient : HttpClient) { }

  get(marketplace : MarketplaceName){
    const path = `api/v1/Architecture?connection=${marketplace}`;

    return this.httpClient.get<ArchitectureModel>(path);
  }
}
