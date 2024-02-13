import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityHttpService } from '../../../core/services/identity-http.service';
import { AuthService } from '../../../core/services/auth.service';
import { Register } from '../../../core/models/identity.models';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  isTryRegister : boolean = false;
  value : Register = {
    email : "",
    password : "",
    repeatPassword : "",
    userName : ""
  }

  constructor(private authService : AuthService, 
    private identityService : IdentityHttpService,
    private router : Router){}

  register(){
    this.isTryRegister = true;
    this.identityService.register(this.value)
      .pipe(
        finalize(() => {
          this.isTryRegister = false;
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
