import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewResult } from '../../../../../core/models/view-result.model';
import { BlackListVm } from './models/black-list.model';
import { SpinerComponent } from "../../../../../shared/components/spiner/spiner.component";
import { BlackListsService } from './services/black-lists.service';
import { concat, finalize, map, tap } from 'rxjs';
import { ViewMappingService } from '../../../../../core/services/view-mapping.service';

@Component({
    selector: 'app-black-lists',
    standalone: true,
    templateUrl: './black-lists.component.html',
    styleUrl: './black-lists.component.scss',
    imports: [CommonModule, FormsModule, SpinerComponent]
})
export class BlackListsComponent implements OnInit {
  newBlackList = {
    isLoad : false,
    name : ""
  }
  isLoad : boolean = false;
  
  selectBlackList : ViewResult<BlackListVm> | null = null;
  blackLists : ViewResult<BlackListVm>[] = [];

  constructor(private blackListsService : BlackListsService, private mapper : ViewMappingService){}

  ngOnInit(): void {
    this.getRange();
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
            if(this.selectBlackList === blackList){
              this.selectBlackList = null;
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
