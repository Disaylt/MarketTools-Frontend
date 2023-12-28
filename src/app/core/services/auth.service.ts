import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  getToken() : string | null{
    return localStorage.getItem("token");
  }

  setToken(token : string){
    localStorage.setItem("token", token);
  }

  deleteToken(){
    localStorage.removeItem("token");
  }
}
