import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Marketplace } from '../models/marketplace.model';
import { MarketplaceStorage } from '../constants/navigations/marketpkaces.storage';

@Injectable({
  providedIn: 'root'
})
export class MarketDeterminantService {

  private _marketplace : Marketplace = MarketplaceStorage.value[0];

  get marketplace() {
    return this._marketplace;
  }

  set marketplace(value : Marketplace){
    console.log(value);
    this._marketplace = value;
    this.toggleEvent.emit();
  }

  toggleEvent : EventEmitter<void> = new EventEmitter<void>();
}
