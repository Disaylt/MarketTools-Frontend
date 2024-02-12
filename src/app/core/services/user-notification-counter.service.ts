import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationCounterService {

  constructor(private toastsService : ToastrService) { }

  private _value : number = 0;

  set value(value : number){
    this._value = value;
  }

  get value(){
    return this._value;
  }
}
