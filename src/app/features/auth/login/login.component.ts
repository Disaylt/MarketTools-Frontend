import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { IdentityHttpService } from '../../../core/services/identity-http.service';
import { CommonModule } from '@angular/common';
import { finalize, timeout } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Login } from '../../../core/models/identity.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  isLoad : boolean = true;
  isTryLogin : boolean = false;
  value : Login = {
    email: "",
    password : ""
  }

  constructor(private authService : AuthService, 
    private identityService : IdentityHttpService,
    private router : Router){}
  
  ngOnInit(): void {
    this.identityService.getAuthStatus()
      .pipe(finalize(() => {
        this.isLoad = false;
      }))
      .subscribe(
        {
          next: (data) => {
            if(data.isAuth){
              this.router.navigate(["/dashboard"])
            }
          }
        }
    )
  }

  login(){
    this.isTryLogin = true;
    this.identityService.login(this.value)
      .pipe(
        finalize(() => {
          this.isTryLogin = false;
        })
      )
      .subscribe(
        {
          next: (data) => {
              this.authService.setToken(data.token);
              this.router.navigate(["/dashboard"])
          }
        }
      )
  }
}
