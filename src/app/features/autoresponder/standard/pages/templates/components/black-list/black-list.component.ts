import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlackListVm } from '../../../black-lists/models/black-list.model';
import { BlackListsService } from '../../../black-lists/services/black-lists.service';
import { Observable, concat } from 'rxjs';
import { SpinerComponent } from "../../../../../../../shared/components/spiner/spiner.component";
import { Template } from '../../models/template';
import { TemplateBindBlackListService } from './services/template-bind-black-list.service';

@Component({
    selector: 'app-black-list',
    standalone: true,
    templateUrl: './black-list.component.html',
    styleUrl: './black-list.component.scss',
    imports: [CommonModule, FormsModule, SpinerComponent]
})
export class BlackListComponent implements OnInit {
  blackLists : BlackListVm[] = [
    {
      id : 0,
      name : "Без проверки"
    }
  ];
  selectedBlackList : BlackListVm | null = null;

  @Input({required : true}) template!: Template;

  constructor(private blackListService : BlackListsService, private bindService : TemplateBindBlackListService){}

  ngOnInit(): void {
    this.blackListService.getRange()
      .subscribe(
        {
          next : data => {
            this.blackLists = this.blackLists.concat(data);
          },
          complete : ()=> {
            const blackListId = this.template.blackListId ?? 0
            const blackList = this.blackLists.find(x=> x.id == blackListId);
            if(blackList){
              this.selectedBlackList = blackList;
              this.moveToUp(blackList);
            }
          }
        }
      )
  }

  select(blackList : BlackListVm){
    
    this.bindService.bind(blackList.id, this.template.id)
      .subscribe({
        complete : () => {
          this.selectedBlackList = blackList;
          this.template.blackListId = blackList.id;
          this.moveToUp(blackList);
        }
      })
  }

  private moveToUp(blackList : BlackListVm){
    const index = this.blackLists.indexOf(blackList);

    this.blackLists.splice(index, 1);
    this.blackLists.unshift(blackList);
  }
}
