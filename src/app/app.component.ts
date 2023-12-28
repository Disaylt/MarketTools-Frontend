import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/components/header/header.component";
import { SidebarComponent } from "./core/components/sidebar/sidebar.component";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { WindowsSizes } from './core/constants/window-sizes';
import { BreadcrumbComponent } from "./core/components/breadcrumb/breadcrumb.component";
import { AuthService } from './core/services/auth.service';
import { AuthComponent } from "./features/auth/auth.component";
import { IdentityHttpService } from './core/services/identity-http.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, HeaderComponent, SidebarComponent, MatSidenavModule, RouterOutlet, BreadcrumbComponent, AuthComponent]
})
export class AppComponent implements OnInit {
  title = 'MarketTools-Frontend';
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild(HeaderComponent) header!: HeaderComponent;
  isMobile = false;

  constructor(private observer: BreakpointObserver, 
    public authService : AuthService, 
    private identityHttpService : IdentityHttpService){}

  ngOnInit(): void {
    this.observer.observe([`(max-width: ${WindowsSizes.mobile}px)`]).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  sendRequest(){
    this.identityHttpService.getUserDetails()
      .subscribe((value) => {
        console.log(value);
      })
  }

  ngAfterViewInit(){
    this.header.toggleEvent.subscribe(()=> {
      this.toggleMenu();
    })
  }
  
  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
    }
  }

}
