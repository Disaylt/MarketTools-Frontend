import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationModel } from './models/notification.model';
import { NotificationsService } from './services/notifications.service';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActiveStatusInfoComponent } from "../../../shared/components/active-status-info/active-status-info.component";
import { ProgressBarComponent } from "../../../shared/components/progress-bar/progress-bar.component";
import { PaginationBarComponent } from "../../../shared/components/pagination-bar/pagination-bar.component";
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { Pagination } from '../../../core/models/pagination.model';
import { UserNotificationCounterService } from '../../../core/services/user-notification-counter.service';

@Component({
    selector: 'app-notifications',
    standalone: true,
    templateUrl: './notifications.component.html',
    styleUrl: './notifications.component.scss',
    imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, FormsModule, ActiveStatusInfoComponent, ProgressBarComponent, PaginationBarComponent]
})
export class NotificationsComponent implements OnInit{
  isLoad : boolean = true;
  notifications : NotificationModel[] = [];
  notificationStatuses : string[] = [
    "Любые",
    "Новые",
    "Просмотренные"
  ]
  notificationStatusSelected : string = this.notificationStatuses[0];
  @ViewChild(PaginationBarComponent) paginationBar! : PaginationBarComponent;

  constructor(private notifService : NotificationsService, private notificationCounter : UserNotificationCounterService){}

  selectNotificationStatus(status : string){
    this.notificationStatusSelected = status;
    this.paginationBar.selectPage(this.paginationBar.paginationDetails.page);
  }

  ngOnInit(): void {
  }

  subscribePaginator(paginator : Pagination){
    this.getRange(paginator);
  }

  setAsReaded(){
    this.isLoad = true;
    this.notifService.readAll()
      .pipe(finalize(() => {
        this.isLoad = false;
      }))
      .subscribe({
        complete : () => {
          this.notifications.forEach(x=> {
            x.isRead = true;
          })
          this.notificationCounter.value = 0;
        }
      })
  }

  getRange(pagination : Pagination){
    this.isLoad = true;
    this.notifService.getRange(pagination.take, pagination.skip, this.getReadStatus())
      .pipe(
        finalize(() => {
          this.isLoad = false;
        })
      )
      .subscribe({
        next : data => {
          this.notifications = data.items;
          this.notifications
            .forEach(x=> {
              x.createDate = new Date(x.createDate).toLocaleDateString();
            })
          this.paginationBar.updateTotal(data.total);
          this.notificationCounter.value = this.notificationCounter.value - data.items
            .filter(x=> x.isRead == false)
            .length;
        }
      })
  }

  private getReadStatus(): boolean | null{
    switch(this.notificationStatusSelected){
      case this.notificationStatuses[1]:
        return false;
      case this.notificationStatuses[2]:
        return true;
      default:
        return null;
    }
  }
}
