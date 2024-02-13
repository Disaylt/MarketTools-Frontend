import { Injectable } from '@angular/core';
import { ServerHost } from '../constants/server-host';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  private _hostUrl! : string;

  constructor() {
    this._hostUrl = ServerHost.get();
   }

   public get hostUrl() : string | null {
    return this._hostUrl;
   }
}
