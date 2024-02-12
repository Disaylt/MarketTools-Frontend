import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationCounterService {

  constructor() { }

  private _value : number = 0;

  set value(value : number){
    this._value = value;
  }

  get value(){
    return this._value;
  }
}
