import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Marketplace } from '../models/marketplace.model';
import { MarketplaceStorage } from '../constants/navigations/marketpkaces.storage';

@Injectable({
  providedIn: 'root'
})
export class MarketDeterminantService{

  private _marketplace : Marketplace | null = null;

  constructor(){
  }

  set(value : Marketplace){
    this._marketplace = value;
    this.toggleEvent.emit(value);
  }

  get() : Marketplace | null{
    return this._marketplace;
  }

  getRequired(){
    if(this._marketplace == null){
      throw new Error();
    }

    return this._marketplace;
  }

  toggleEvent : EventEmitter<Marketplace> = new EventEmitter<Marketplace>();
}
