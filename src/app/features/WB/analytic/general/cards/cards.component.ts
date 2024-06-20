import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CardsService } from './services/cards.service';
import { CardModel } from './models/card.model';
import { finalize } from 'rxjs';
import { ProgressBarComponent } from "../../../../../shared/components/progress-bar/progress-bar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { ReportModalComponent } from '../../../workspace/price/report-modal/report-modal.component';
import { WbAnalyticGeneralCardSearchPipe } from "../../../../../shared/pipes/wb-analytic-general-card-search.pipe";
import { CardComponent } from '../card/card.component';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-cards',
    standalone: true,
    templateUrl: './cards.component.html',
    styleUrl: './cards.component.scss',
    imports: [ProgressBarComponent, CommonModule, FormsModule, WbAnalyticGeneralCardSearchPipe, RouterOutlet, RouterLink, RouterLinkActive]
})
export class CardsComponent implements OnInit, OnChanges {
    @Input({required : true}) connectionId! : number;
    @Input({required : true}) cardsSearch! : string;

    isLoad : boolean = false;
    cards : CardModel[] = [];
    constructor(private cardsService : CardsService, private dialog: Dialog){

    }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['connectionId']) {
      this.loadCards();
    }
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
