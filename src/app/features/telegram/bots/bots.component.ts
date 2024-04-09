import { Component, OnInit } from '@angular/core';
import { TelegramUsersService } from './services/telegram-users.service';
import { TelegramService, TelegramUser } from './models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription, finalize, map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from "../../../shared/components/progress-bar/progress-bar.component";
import { ActiveStatusInfoComponent } from "../../../shared/components/active-status-info/active-status-info.component";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-bots',
    standalone: true,
    templateUrl: './bots.component.html',
    styleUrl: './bots.component.scss',
    imports: [CommonModule, ProgressBarComponent, ActiveStatusInfoComponent, FormsModule]
})
export class BotsComponent implements OnInit {
  isLoad : boolean = false;
  users : TelegramUser[] = []
  botId : number | null = null;
  url : string | null = null;

  constructor(private tgUserService : TelegramUsersService, private activateRoute: ActivatedRoute)
  {

  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
      this.botId = params["id"]
      this.loadUsers();
    });
  }

  loadBotToken(){
    this.url = null;
    if(this.botId == null){
      return;
    }
  }

  deleteUser(id : number){
    this.tgUserService
      .delete(id)
      .subscribe({
        complete: () => {
          this.users = this.users
            .filter(x=> x.id != id);
        }
      })
  }

  changeSerivceSubscription(userId : number, service : TelegramService){
    if(service.id == 0){
      this.tgUserService
        .addService(userId, service.serviceType)
        .subscribe({
          next : x=> {
            service.isActive = true;
            service.id = x.id
          },
          error : () => {
            service.isActive = false;
          }
        })
    }
    else{
      this.tgUserService
        .deleteService(service.id)
        .subscribe({
          complete : () => {
            service.id = 0;
            service.isActive = false;
          },
          error : () => {
            service.isActive = !service.isActive;
          }
        })
    }
  }

  loadUsers(){
    this.users = []
    if(this.botId == null){
      return;
    }
    this.isLoad = true;
    this.tgUserService
      .getRange(this.botId)
      .pipe(
        map(x=> {
          x.forEach(user => {
            user.services.forEach(service => {
              if(service.id == 0){
                service.isActive = false;
              }
              else{
                service.isActive = true;
              }
            })
          })
          return x;
        }),
        finalize(() => {
          this.isLoad = false;
        })
      )
      .subscribe({
        next: x=> {
          this.users = x;
        }
      })
  }
}
