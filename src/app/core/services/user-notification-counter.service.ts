import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationCounterService {

  constructor(private toastsService : ToastrService) { }

  private _value : number = 0;

  set value(value : number){
    this.sendNewNotificationsAlert(value);
    this._value = value;
  }

  get value(){
    return this._value;
  }

  private sendNewNotificationsAlert(value : number){
    if(value === 0){
      return;
    }

    this.toastsService.info("У вас есть непрочитанные уведомления.", "", {
      progressBar : true,
      closeButton : true,
      toastClass: "ngx-toastr shadow-none rounded-3 app-error-alert-bg"
  });
  }
}
