import { Injectable, OnInit } from '@angular/core';
import { ServerHost } from '../constants/server-host';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServerHttpService{

  private hostUrl! : string;

  constructor(private http : HttpClient) 
  {
    this.hostUrl = ServerHost.get();
  }

  get<T>(path : string){
    return this.http.get<T>(`${this.hostUrl}${path}`);
  }

  delete<T>(path : string){
    return this.http.delete<T>(`${this.hostUrl}${path}`);
  }

  post<T>(path : string, body : any){
    return this.http.post<T>(`${this.hostUrl}${path}`, body);
  }

  put<T>(path : string, body : any){
    return this.http.post<T>(`${this.hostUrl}${path}`, body);
  }
}
