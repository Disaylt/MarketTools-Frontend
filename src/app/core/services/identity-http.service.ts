import { Injectable } from '@angular/core';
import { ServerHttpService } from './server-http.service';
import { Observable } from 'rxjs';
import { AuthDetails, AuthStatus, Login, Register, UserDetails } from '../models/identity.models';

@Injectable({
  providedIn: 'root'
})
export class IdentityHttpService {

  constructor(private serverHttp : ServerHttpService) { }

  getAuthStatus() : Observable<AuthStatus>{
    const path  = "api/v1/Identity/is-auth";

    return this.serverHttp.get(path);
  }

  getUserDetails() : Observable<UserDetails>{
    const path = "api/v1/Identity";

    return this.serverHttp.get(path);
  }

  login(body : Login) : Observable<AuthDetails>{
    const path = "/api/v1/Identity/login"

    return this.serverHttp.post(path, body);
  }

  register(body : Register) : Observable<AuthDetails>{
    const path = "/api/v1/Identity/register"

    return this.serverHttp.post(path, body);
  }
}
