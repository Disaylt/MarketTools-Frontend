import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenModel } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private httpClient : HttpClient) { }

  create(){
    const path = "api/v1/telegram/token";

    return this.httpClient.post<TokenModel>(path, null);
  }
}
