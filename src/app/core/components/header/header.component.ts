import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { WindowsSizes } from '../../constants/window-sizes';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import { UserMenuComponent } from "./user-menu/user-menu.component";
import { UserNotificationCounterService } from '../../services/user-notification-counter.service';
import { NotificationsService } from '../../../features/user/notifications/services/notifications.service';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [MatIconModule, CommonModule, CdkMenuTrigger, CdkMenu, CdkMenuItem, UserMenuComponent, RouterModule]
})
export class HeaderComponent implements OnInit{
  @Output() toggleEvent = new EventEmitter<void>();

  constructor(public notificationsCounter : UserNotificationCounterService, 
    private userNotificationsService : NotificationsService,
    private toastsService : ToastrService){}
  
  ngOnInit(): void {
    this.loadNotReadAlerts();
  }

  toggleClick(){
    this.toggleEvent.emit();
  }

  private loadNotReadAlerts(){
    this.userNotificationsService.count(false)
      .subscribe({
        next: data => {
          this.notificationsCounter.value = data.value;

          if(data.value > 0){
            this.toastsService.info("У вас есть непрочитанные уведомления.", "", {
              progressBar : true,
              closeButton : true,
              toastClass: "ngx-toastr shadow-none rounded-3 app-error-alert-bg"
          });
          }
        }
      })
  }

}
