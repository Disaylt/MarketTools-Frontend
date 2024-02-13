import { Component, Input, OnInit } from '@angular/core';
import { BanWordsService } from './services/ban-words.service';
import { ViewMappingService } from '../../../../../../../core/services/view-mapping.service';
import { ViewResult } from '../../../../../../../core/models/view-result.model';
import { BanWord } from './models/ban-word';
import { finalize, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinerComponent } from "../../../../../../../shared/components/spiner/spiner.component";
import { ProgressBarComponent } from "../../../../../../../shared/components/progress-bar/progress-bar.component";

@Component({
    selector: 'app-ban-words',
    standalone: true,
    templateUrl: './ban-words.component.html',
    styleUrl: './ban-words.component.scss',
    imports: [CommonModule, FormsModule, SpinerComponent, ProgressBarComponent]
})
export class BanWordsComponent {
  private _blackListId! : number;

  @Input()
  set blackListId(value : number){
    this._blackListId = value;
    this.getRange();
  }

  newBanWord = {
    value : "",
    isLoad : false
  }

  isLoad : boolean = false;
  banWords : ViewResult<BanWord>[] = [];

  constructor(private banWordsService : BanWordsService, private mapper : ViewMappingService){}
  
  getRange(){
    const requestBlackListId = this._blackListId;
    this.isLoad = true;
    this.banWords = [];

    this.banWordsService.getRange(requestBlackListId)
      .pipe(
        map((data) => data.map(x=> this.mapper.map(x)))
      )
      .subscribe({
        next: data => {
          if(this._blackListId == requestBlackListId){
            this.banWords = data;
            this.isLoad = false;
          }
        }
      })
  }
  
  delete(banWord : ViewResult<BanWord>){
    banWord.actions.isLoad = true;

    this.banWordsService.delete(banWord.data.id)
      .pipe(
        finalize(() => {
          banWord.actions.isLoad = false;
        })
      )
      .subscribe({
        complete : () => {
          this.banWords = this.banWords.filter(x=> x != banWord);
        }
      })
  }

  add(){
    this.newBanWord.isLoad = true;
    const requestBlackListId = this._blackListId;

    this.banWordsService.add(this.newBanWord.value, requestBlackListId)
      .pipe(
        map(x=> this.mapper.map(x)),
        finalize(() => {
          this.newBanWord.isLoad = false;
        })
      )
      .subscribe(
        {
          next : (data) => {
            if(this._blackListId == requestBlackListId){
              this.banWords.push(data);
              this.newBanWord.value = "";
            }
          }
        }
      )
  }

}
