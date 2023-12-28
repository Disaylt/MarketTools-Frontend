import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuth : boolean = true;
  private _token : string | null = null;

  public get isAuth() : boolean{
    return this._isAuth;
  }

  setAuth(status : boolean){
    this._isAuth = status;
  }

  getToken() : string | null{
    if(this._token === null){
      this._token = localStorage.getItem("token");
    }

    return this._token;
  }

  setToken(token : string){
    localStorage.setItem("token", token);
    this._token = token;
  }
}
