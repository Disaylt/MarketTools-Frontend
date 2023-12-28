import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthDetails, AuthStatus, Login, Register, UserDetails } from '../models/identity.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IdentityHttpService {

  constructor(private http : HttpClient) { }

  getAuthStatus() : Observable<AuthStatus>{
    const path  = "api/v1/Identity/is-auth";

    return this.http.get<AuthStatus>(path);
  }

  getUserDetails() : Observable<UserDetails>{
    const path = "api/v1/Identity";

    return this.http.get<UserDetails>(path);
  }

  login(body : Login) : Observable<AuthDetails>{
    const path = "/api/v1/Identity/login"

    return this.http.post<AuthDetails>(path, body);
  }

  register(body : Register) : Observable<AuthDetails>{
    const path = "/api/v1/Identity/register"

    return this.http.post<AuthDetails>(path, body);
  }
}
