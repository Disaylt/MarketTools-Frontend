import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ModalComponent } from "../../../../../shared/components/modal/modal.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CdkMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { CardsService } from '../cards/services/cards.service';
import { AnalyticCardModel, CardModel } from '../cards/models/card.model';
import { finalize } from 'rxjs';
import { ProgressBarComponent } from "../../../../../shared/components/progress-bar/progress-bar.component";
import { AnalyticTableComponent } from "./analytic-table/analytic-table.component";
import { NewComissionModalComponent } from '../new-comission-modal/new-comission-modal.component';
import { NewCostPriceModalComponent } from '../new-cost-price-modal/new-cost-price-modal.component';
import { PromotionComponent } from "./promotion/promotion.component";
import { SearchWordsComponent } from "./search-words/search-words.component";

@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
    providers: [],
    imports: [RouterOutlet,
        RouterLink,
        RouterLinkActive,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ModalComponent,
        CommonModule,
        FormsModule,
        CdkMenuTrigger,
        CdkMenu,
        CdkMenuItem,
        JsonPipe,
        ReactiveFormsModule,
        CalendarModule, ProgressBarComponent, AnalyticTableComponent, PromotionComponent, SearchWordsComponent]
})
export class CardComponent implements OnInit{
  id : number;
  connectionId : number;

  isLoad : boolean = false;
  analyticCalendarTypes : string[] = [
    "Дни",
    "Недели",
    "Месяцы"
  ]
  selectedAnalyticCalendarType : string = "Дни";

  rangeDates: Date[] = [new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 30)), new Date()];
  @ViewChild(CdkMenu) cdkMenu!: CdkMenu;

  card : AnalyticCardModel | null = null;

  constructor(activateRoute: ActivatedRoute, private cardsService : CardsService, private dialog : Dialog){
          
    this.id = activateRoute.snapshot.params["id"];
    this.connectionId = activateRoute.snapshot.queryParams["connectionId"];
  }

  ngOnInit(): void {
    const beginDate = localStorage.getItem("analyticGeneralDateBegin");
    const endDate = localStorage.getItem("analyticGeneralDateEnd");

    if(beginDate && endDate){
      this.rangeDates = [
        new Date(beginDate),
        new Date(endDate)
      ]
    }

    this.selectedAnalyticCalendarType = localStorage.getItem("analyticGeneralType") ?? "Дни";
    this.loadCard();
    
  }

  openCostPriceModal(card : AnalyticCardModel){
    const modal = this.dialog.open(NewCostPriceModalComponent);
    if(modal.componentInstance)
    {
      modal.componentInstance.card = card;
    }
    modal.closed.subscribe({
      next : data => {
        if(data === true){
          this.loadCard();
        }
      }
    })
  }

  openComissionTypeModal(card : AnalyticCardModel){
    const modal = this.dialog.open(NewComissionModalComponent);
    if(modal.componentInstance)
    {
      modal.componentInstance.card = card;
    }
    modal.closed.subscribe({
      next : data => {
        if(data === true){
          this.loadCard();
        }
      }
    })
  }

  getDates(){

    const dates : Date[] = []

    if(this.rangeDates[0] == null || this.rangeDates[1] == null){
      return dates;
    }

    for(let indexDate = this.rangeDates[1]; indexDate >= this.rangeDates[0]; indexDate = new Date(indexDate.getTime() - (1000 * 60 * 60 * 24))){
      dates.push(indexDate);

      if(dates.length > 365){
        break;
      }
    }

    return dates;
  }

  changeCombineStatus(){
    if(this.card){
      this.isLoad = true;
      this.cardsService
        .combineStatus(this.card.isCombineSizes, this.card.id)
        .pipe(finalize(() => this.isLoad = false))
        .subscribe({
          next : data => {

          }
        });
    }
  }

  selectAnalyticType(type : string){
    localStorage.setItem("analyticGeneralType", type);
    this.selectedAnalyticCalendarType = type;
  }

  selectDates(){
    if(this.rangeDates.some(x=> x == null)){
      return;
    }

    localStorage.setItem("analyticGeneralDateBegin", this.rangeDates[0].toString())
    localStorage.setItem("analyticGeneralDateEnd", this.rangeDates[1].toString())

    this.cdkMenu.menuStack.closeAll();
    this.loadCard();
  }

  loadCard(){
    this.card = null;
    this.isLoad = true;
    this.cardsService
      .get(this.id, this.rangeDates[0], this.rangeDates[1])
      .pipe(finalize(() => {
        this.isLoad = false;
      }))
      .subscribe({
        next : data => {
          this.card = data;
          console.log(data);
        }
      })
  }
}

