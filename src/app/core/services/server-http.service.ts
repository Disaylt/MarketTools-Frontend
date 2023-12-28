import { Injectable, OnInit } from '@angular/core';
import { ServerHost } from '../constants/server-host';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServerHttpService implements OnInit {

  private hostUrl! : string;

  constructor(private http : HttpClient, private authService : AuthService) { }

  ngOnInit(): void {
    this.hostUrl = ServerHost.get();
  }

  get<T>(path : string){
    return this.http.get<T>(`${this.hostUrl}${path}`, { headers : this.getHeaders()});
  }

  delete<T>(path : string){
    return this.http.delete<T>(`${this.hostUrl}${path}`, { headers : this.getHeaders()});
  }

  post<T>(path : string, body : any){
    return this.http.post<T>(`${this.hostUrl}${path}`, body, { headers : this.getHeaders()});
  }

  put<T>(path : string, body : any){
    return this.http.post<T>(`${this.hostUrl}${path}`, body, { headers : this.getHeaders()});
  }

  private getHeaders(){
    return new HttpHeaders()
      .set("Authorization", `Bearer ${this.authService.getToken()}`)
  }
}
