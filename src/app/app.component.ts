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

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, HeaderComponent, SidebarComponent, MatSidenavModule]
})
export class AppComponent implements OnInit {
  title = 'MarketTools-Frontend';
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild(HeaderComponent) header!: HeaderComponent;
  isMobile = false;

  constructor(private observer: BreakpointObserver){}

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

  nums : number[] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

}
