import { Component, OnInit, ViewChild } from '@angular/core';
import { RatingBarComponent } from "../../../../../shared/components/rating-bar/rating-bar.component";
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarketplaceConnectionModel } from '../../../../marketplace-connections/models/marketplace-connection.model';
import { NameFilterPipe } from "../../../../../shared/pipes/name-filter.pipe";
import { MarketplaceConnectionsService } from '../../../../marketplace-connections/services/marketplace-connections.service';
import { MarketDeterminantService } from '../../../../../core/services/market-determinant.service';
import { ConnectionsService } from '../connection/services/connections.service';
import { ServicesName } from '../../../../../core/enums/services-name.enum';
import { ResponseTestingService } from './services/response-testing.service';
import { SpinerComponent } from "../../../../../shared/components/spiner/spiner.component";
import { TestBody } from './models/test-body.model';
import { finalize } from 'rxjs';
import { MarketplaceConnectionV2Service } from '../../../../marketplace-connections/services/marketplace-connection-v2.service';
import { BaseConnectionV2 } from '../../../../marketplace-connections/models/marketplace-connections-v2.models';

@Component({
    selector: 'app-response-testing',
    standalone: true,
    templateUrl: './response-testing.component.html',
    styleUrl: './response-testing.component.scss',
    imports: [RatingBarComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, FormsModule, NameFilterPipe, SpinerComponent]
})
export class ResponseTestingComponent implements OnInit {
  @ViewChild(CdkMenu) cdkMenu!: CdkMenu;
  rate : number = 0
  selectConnection : BaseConnectionV2 | null = null;
  connections : BaseConnectionV2[] = [];
  feedbackTextArea : string = "";
  responseText : string = "";
  responseReport : string = "";
  article : string = "";

  searchConnectionName : string = "";

  isLoad : boolean = false;

  constructor(private sellerService : MarketplaceConnectionV2Service,
    private marketDeterminantService : MarketDeterminantService,
    private autoresponderConnectionSeervice : ConnectionsService,
    private testService : ResponseTestingService){}

  ngOnInit(): void {
    this.getRange();
  }

  sendFeedback(){
    if(this.selectConnection == null){
      return;
    }

    this.responseReport = "";
    this.responseText = "";
    this.isLoad = true;

    const body : TestBody = {
      connectionId : this.selectConnection.id,
      article : this.article,
      text : this.feedbackTextArea,
      rating : this.rate
    }

    this.testService.create(body)
      .pipe(
        finalize(() => {
          this.isLoad = false;
        })
      )
      .subscribe({
        next : data => {
          this.responseReport = data.report;
          this.responseText = data.text;
        }
      })
  }

  select(connection : BaseConnectionV2){
    this.cdkMenu.menuStack.closeAll();
    this.selectConnection = connection;
  }

  getRange(){
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
}
