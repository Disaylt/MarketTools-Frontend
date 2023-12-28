import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss'
})
export class UserMenuComponent {

  constructor(private authService: AuthService, private routerService : Router){}

  exit(){
    this.authService.deleteToken();
    this.routerService.navigate(["/auth"])
  }
}
