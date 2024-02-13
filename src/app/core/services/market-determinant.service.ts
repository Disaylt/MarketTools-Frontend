import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Marketplace } from '../models/marketplace.model';
import { MarketplaceStorage } from '../constants/navigations/marketpkaces.storage';

@Injectable({
  providedIn: 'root'
})
export class MarketDeterminantService{

  private _marketplace : Marketplace;

  constructor(){
    this._marketplace = MarketplaceStorage.value[0];
  }

  get marketplace() {
    return this._marketplace;
  }

  set marketplace(value : Marketplace){
    this._marketplace = value;
    this.toggleEvent.emit();
  }

  toggleEvent : EventEmitter<void> = new EventEmitter<void>();
}
