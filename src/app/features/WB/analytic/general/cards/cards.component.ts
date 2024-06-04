import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CardsService } from './services/cards.service';
import { CardModel } from './models/card.model';
import { finalize } from 'rxjs';
import { ProgressBarComponent } from "../../../../../shared/components/progress-bar/progress-bar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { ReportModalComponent } from '../../../workspace/price/report-modal/report-modal.component';

@Component({
    selector: 'app-cards',
    standalone: true,
    templateUrl: './cards.component.html',
    styleUrl: './cards.component.scss',
    imports: [ProgressBarComponent, CommonModule, FormsModule]
})
export class CardsComponent implements OnInit, OnChanges {
    @Input({required : true}) connectionId! : number;
    @Input({required : true}) cardsSearch! : string;

    isLoad : boolean = false;
    cards : CardModel[] = [];
    constructor(private cardsService : CardsService, private dialog: Dialog){

    }

  ngOnInit() {
    this.loadCards();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['connectionId']) {
      this.loadCards();
    }
  }

  selectCards(id : number){
    const modal = this.dialog.open(ReportModalComponent);
  }

  private loadCards(){
    this.isLoad = true;

    this.cardsService
      .getAll(this.connectionId)
      .pipe(finalize(() => {
        this.isLoad = false;
      }))
      .subscribe({
        next : data =>{
          this.cards = data;
        }
      })
  }
}
