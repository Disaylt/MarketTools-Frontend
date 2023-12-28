import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../services/auth.service';
import { WindowsSizes } from '../../constants/window-sizes';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { AuthComponent } from '../../../features/auth/auth.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, MatSidenavModule, RouterOutlet, BreadcrumbComponent, AuthComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild(HeaderComponent) header!: HeaderComponent;
  isMobile = false;

  constructor(private observer: BreakpointObserver, 
    public authService : AuthService){}

  ngOnInit(): void {
    this.observer.observe([`(max-width: ${WindowsSizes.mobile}px)`]).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
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
