import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from './services/reports.service';
import { ReportModel } from './models/report.model';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActiveStatusInfoComponent } from '../../../../../shared/components/active-status-info/active-status-info.component';
import { ProgressBarComponent } from '../../../../../shared/components/progress-bar/progress-bar.component';
import { PaginationBarComponent } from '../../../../../shared/components/pagination-bar/pagination-bar.component';
import { TabBarComponent } from "../../../../../shared/components/tab-bar/tab-bar.component";
import { TabBarButtonComponent } from "../../../../../shared/components/tab-bar/tab-bar-button/tab-bar-button.component";
import { finalize } from 'rxjs';
import { MarketplaceConnectionModel } from '../../../../marketplace-connections/models/marketplace-connection.model';
import { NameFilterPipe } from "../../../../../shared/pipes/name-filter.pipe";
import { MarketplaceConnectionsService } from '../../../../marketplace-connections/services/marketplace-connections.service';
import { ServicesName } from '../../../../../core/enums/services-name.enum';
import { MarketDeterminantService } from '../../../../../core/services/market-determinant.service';
import { RatingBarComponent } from "../../../../../shared/components/rating-bar/rating-bar.component";
import { Pagination } from '../../../../../core/models/pagination.model';
import { MarketplaceConnectionV2Service } from '../../../../marketplace-connections/services/marketplace-connection-v2.service';
import { BaseConnectionV2 } from '../../../../marketplace-connections/models/marketplace-connections-v2.models';

@Component({
    selector: 'app-reports',
    standalone: true,
    templateUrl: './reports.component.html',
    styleUrl: './reports.component.scss',
    imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, FormsModule, ActiveStatusInfoComponent, ProgressBarComponent, PaginationBarComponent, TabBarComponent, TabBarButtonComponent, NameFilterPipe, RatingBarComponent]
})
export class ReportsComponent implements OnInit {
  reports : ReportModel[] = [];
  isLoad = false;
  constructor(private reportsService : ReportsService, 
    private sellerService : MarketplaceConnectionV2Service,
    private marketDeterminantService : MarketDeterminantService){}
  tabs : string[] = [
    "Отчет",
    "Ответ"
  ]
  selectedTab : string = this.tabs[0];

  statuses : string[] = [
    "Любой",
    "Успешно",
    "Ошибка"
  ]
  selectedStatus : string = this.statuses[0];

  selectedConnection : BaseConnectionV2 | null = null;
  connections : BaseConnectionV2[] = [];
  searchConnectionName : string = "";

  searchArticle : string = "";
  searchRating : number | null = null;

  @ViewChild(CdkMenu) cdkMenu!: CdkMenu;
  @ViewChild(RatingBarComponent) ratingBar! : RatingBarComponent;
  @ViewChild(PaginationBarComponent) paginationBar! : PaginationBarComponent;

  ngOnInit(): void {
    this.getConnections();
  }

  clearRating(){
    this.ratingBar.change(0);
  }

  selectRating(rate : number){
    if(rate > 0){
      this.searchRating = rate;
    }
    else{
      this.searchRating = null;
    }
    this.getRange();
  }

  selectConnection(connection : BaseConnectionV2){
    this.cdkMenu.menuStack.closeAll();
    this.selectedConnection = connection;
    this.getRange();
  }
  
  selectStatus(status : string){
    this.selectedStatus = status;
    this.getRange();
  }

  getConnections(){
    this.connections = [];

    this.sellerService.getRange(this.marketDeterminantService.getRequired().nameEnum)
      .pipe(
      )
      .subscribe(
        {
          next : data => {
            this.connections = data;
          }
        }
      )
  }

  getRange(){
    if(this.selectedConnection == null){
      return;
    }

    const connection = this.selectedConnection;
    const rating = this.searchRating;
    const article = this.searchArticle;
    const status = this.selectedStatus;

    this.isLoad = true;
    this.reportsService.getRange(this.paginationBar.paginationDetails.take, this.paginationBar.paginationDetails.skip, connection.id, rating, this.converStatus(status), article)
      .pipe(finalize(() => {
        if(this.selectedConnection == connection 
          && rating == this.searchRating 
          && this.searchArticle == article 
          && this.selectedStatus == status){
          this.isLoad = false;
        }
      }))
      .subscribe({
        next : data => {
          if(this.selectedConnection == connection 
            && rating == this.searchRating 
            && this.searchArticle == article 
            && this.selectedStatus == status)
          {
            this.reports = data.items;
            this.reports.forEach(x=> {
              x.report = x.report.replaceAll("\r\n\r\n", "\r\n");
              x.createDate = new Date(x.createDate).toLocaleString();
              x.reviewCreateDate = new Date(x.reviewCreateDate).toLocaleString();
            })
            this.paginationBar.updateTotal(data.total);
          }
        }
      })
  }

  private converStatus(status : string) : boolean | null{
    switch(status){
      case this.statuses[1]:
        return true;
      case this.statuses[2]:
        return false;
      default:
        return null;
    }
  }
}
