import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewMappingService } from '../../../../../core/services/view-mapping.service';
import { TemplateService } from '../templates/services/template.service';
import { Template } from '../templates/models/template';
import { finalize } from 'rxjs';
import { TemplateFilterPipe } from "../../../../../shared/pipes/template-filter.pipe";
import { MarketplaceConnectionsService } from '../../../../marketplace-connections/services/marketplace-connections.service';
import { MarketplaceConnectionModel } from '../../../../marketplace-connections/models/marketplace-connection.model';
import { MarketDeterminantService } from '../../../../../core/services/market-determinant.service';
import { MarketplaceName } from '../../../../../core/enums/marketplace-name';
import { MarketplaceConnectionType } from '../../../../../core/enums/marketplace-connection.enum';
import { NameFilterPipe } from "../../../../../shared/pipes/name-filter.pipe";
import { ActiveStatusInfoComponent } from "../../../../../shared/components/active-status-info/active-status-info.component";
import { ConnectionsService } from './services/connections.service';
import { RatingsService } from './services/ratings.service';
import { ProgressBarComponent } from "../../../../../shared/components/progress-bar/progress-bar.component";
import { SpinerComponent } from "../../../../../shared/components/spiner/spiner.component";
import { RatingsComponent } from "./components/ratings/ratings.component";
import { RatingModel } from './models/rating.model';
import { ReversScorePipe } from "../../../../../shared/pipes/revers-score.pipe";
import { ViewReversScorePipe } from "../../../../../shared/pipes/view-revers-score.pipe";
import { ServicesName } from '../../../../../core/enums/services-name.enum';
import { MarketplaceConnectionV2Service } from '../../../../marketplace-connections/services/marketplace-connection-v2.service';
import { BaseConnectionV2 } from '../../../../marketplace-connections/models/marketplace-connections-v2.models';

@Component({
    selector: 'app-connection',
    standalone: true,
    templateUrl: './connection.component.html',
    styleUrl: './connection.component.scss',
    imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, FormsModule, TemplateFilterPipe, NameFilterPipe, ActiveStatusInfoComponent, ProgressBarComponent, SpinerComponent, RatingsComponent, ReversScorePipe, ViewReversScorePipe]
})
export class ConnectionComponent {
  scores : number[] = [];
  searchSellerValue : string = "";
  isLoad : boolean = true;
  selectSeller : BaseConnectionV2 | null = null;
  sellers : BaseConnectionV2[] = [];
  ratingsForAdd : number[] = [5,4,3,2,1]
  isLoadActiveStatus : boolean = false;

  @ViewChild(CdkMenu) cdkMenu!: CdkMenu;
  @ViewChild(RatingsComponent) ratingsComponent! : RatingsComponent;
  
  constructor(private mapper : ViewMappingService, 
    private sellerService : MarketplaceConnectionV2Service,
    private marketDeterminantService : MarketDeterminantService,
    private autoresponderConnectionSeervice : ConnectionsService){}

  ngOnInit(): void {
    this.getRange();
  }
  
  select(seller : BaseConnectionV2){
    this.cdkMenu.menuStack.closeAll();
    this.selectSeller = seller;
  }
  
  isActiveService(connection : BaseConnectionV2){
    return connection.services
      .find(x=> x.type == ServicesName.standardAutoresponder)
      ?.isActive
      ?? false;
  }

  changeStatus(selectSeller : MarketplaceConnectionModel){
    this.isLoadActiveStatus = true;
    this.autoresponderConnectionSeervice
      .updateActiveStatus(selectSeller.id, selectSeller.autoresponderConnection.isActive)
      .pipe(finalize(() => {
        this.isLoadActiveStatus = false;
      }))
      .subscribe({
        error : () => {
          selectSeller.autoresponderConnection.isActive = !selectSeller.autoresponderConnection.isActive;
        }
      })

  }

  getRange(){
    this.isLoad = true;
    this.sellers = [];

    this.sellerService.getRange(this.marketDeterminantService.getRequired().nameEnum)
      .pipe(
        finalize(() => {
          this.isLoad = false;
        })
      )
      .subscribe(
        {
          next : data => {
            this.sellers = data;
          }
        }
      )
  }

}
