import { Component } from '@angular/core';
import { ResetPasswordModel } from '../../../core/models/identity.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { IdentityHttpService } from '../../../core/services/identity-http.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss'
})
export class ResetComponent {

  load : boolean = false;
  value : ResetPasswordModel = {
    code : "",
    email : "",
    password : "",
    repeatPassword : ""
  }

  constructor(private authService : AuthService, 
    private identityService : IdentityHttpService,
    private toastsService : ToastrService,
    private router : Router){}

  sendCode(){
    this.identityService
      .sendCode(this.value.email)
      .subscribe({
        complete : () => {
          this.toastsService.error("Код успешно отправлен", "", {
            progressBar : true,
            closeButton : true,
            toastClass: "ngx-toastr shadow-none rounded-3 app-info-alert-bg"
        });
        }
      });
  }

  resetPassword(){
    this.load = true;
    this.identityService.resetPassword(this.value)
    .pipe(
      finalize(() => {
        this.load = false;
      })
    )
      .subscribe(
        {
          next : (data) => {
            this.authService.setToken(data.token);
            this.router.navigate(["/dashboard"]);
          }
        }
      )
  }

}
