import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewResult } from '../../../../../core/models/view-result.model';
import { BlackListVm } from './models/black-list.model';
import { SpinerComponent } from "../../../../../shared/components/spiner/spiner.component";
import { BlackListsService } from './services/black-lists.service';
import { concat, finalize, map, tap } from 'rxjs';
import { ViewMappingService } from '../../../../../core/services/view-mapping.service';
import { BanWordsComponent } from "./components/ban-words/ban-words.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-black-lists',
    standalone: true,
    templateUrl: './black-lists.component.html',
    styleUrl: './black-lists.component.scss',
    imports: [CommonModule, FormsModule, SpinerComponent, BanWordsComponent, RouterLink, RouterOutlet]
})
export class BlackListsComponent implements OnInit {
  newBlackList = {
    isLoad : false,
    name : ""
  }
  isLoad : boolean = false;
  
  selectedBlackList : BlackListVm | null = null;
  blackLists : ViewResult<BlackListVm>[] = [];

  constructor(private blackListsService : BlackListsService, private mapper : ViewMappingService){}

  selectBlackList(blackLists : ViewResult<BlackListVm>){
    this.selectedBlackList = blackLists.data;
  }

  ngOnInit(): void {
    this.getRange();
  }

  preventEvent(event: Event) {
    event.stopPropagation();
  }

  getRange(){
    this.isLoad = true;

    this.blackListsService.getRange()
      .pipe(
        map(data=> data.map(x=> this.mapper.map(x))),
        finalize(() => {
          this.isLoad = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.blackLists = data;
        }
      })
  }

  delete(blackList : ViewResult<BlackListVm>){
    blackList.actions.isLoad = true;

    this.blackListsService.delete(blackList.data.id)
      .pipe(
        finalize(() => {
          blackList.actions.isLoad = false;
        })
      )
      .subscribe(
        {
          complete : () => {
            if(this.selectedBlackList === blackList.data){
              this.selectedBlackList = null;
            }
            this.blackLists = this.blackLists
              .filter(x=> x != blackList);
          }
        }
      )
  }

  add(){
    this.newBlackList.isLoad = true;

    this.blackListsService.add(this.newBlackList.name)
      .pipe(
        map(data=> this.mapper.map(data)),
        finalize(() => {
          this.newBlackList.isLoad = false;
        })
      )
        .subscribe({
          next : (data) => {
            this.blackLists.push(data);
          },
          complete: () => {
            this.newBlackList.name = "";
          }
        })
  }
}
