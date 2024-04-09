import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActiveStatusInfoComponent } from '../../../shared/components/active-status-info/active-status-info.component';
import { ProgressBarComponent } from '../../../shared/components/progress-bar/progress-bar.component';
import { SpinerComponent } from '../../../shared/components/spiner/spiner.component';
import { NameFilterPipe } from '../../../shared/pipes/name-filter.pipe';
import { ReversScorePipe } from '../../../shared/pipes/revers-score.pipe';
import { TemplateFilterPipe } from '../../../shared/pipes/template-filter.pipe';
import { ViewReversScorePipe } from '../../../shared/pipes/view-revers-score.pipe';
import { MarketDeterminantService } from '../../../core/services/market-determinant.service';
import { MarketplaceConnectionModel } from '../../marketplace-connections/models/marketplace-connection.model';
import { finalize } from 'rxjs';
import { ServicesName } from '../../../core/enums/services-name.enum';
import { MarketplaceConnectionsService } from '../../marketplace-connections/services/marketplace-connections.service';
import { TabBarComponent } from "../../../shared/components/tab-bar/tab-bar.component";
import { TabBarButtonComponent } from "../../../shared/components/tab-bar/tab-bar-button/tab-bar-button.component";
import { RouterModule } from '@angular/router';
import { ConnectionsService } from './services/connections.service';
import { SettingsComponent } from "./components/settings/settings.component";

@Component({
    selector: 'app-prices',
    standalone: true,
    templateUrl: './prices.component.html',
    styleUrl: './prices.component.scss',
    imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, RouterModule, FormsModule, TemplateFilterPipe, NameFilterPipe, ActiveStatusInfoComponent, ProgressBarComponent, SpinerComponent, ReversScorePipe, ViewReversScorePipe, TabBarComponent, TabBarButtonComponent, SettingsComponent]
})
export class PricesComponent implements OnInit {

  searchSellerValue : string = "";
  isLoad : boolean = true;
  selectSeller : MarketplaceConnectionModel | null = null;
  sellers : MarketplaceConnectionModel[] = [];
  isLoadActiveStatus : boolean = false;
  constructor(private marketDeterminantService : MarketDeterminantService,
    private sellerService : MarketplaceConnectionsService,
    private serviceConnectionService : ConnectionsService){
      
    }

    ngOnInit(): void {
      this.getRange();
    }
    
    changeStatus(selectSeller : MarketplaceConnectionModel){
      this.isLoadActiveStatus = true;
      this.serviceConnectionService
        .updateActiveStatus(selectSeller.id, selectSeller.priceMonitoringConnection.isActive)
        .pipe(finalize(() => {
          this.isLoadActiveStatus = false;
        }))
        .subscribe({
          error : () => {
            selectSeller.priceMonitoringConnection.isActive = !selectSeller.priceMonitoringConnection.isActive;
          }
        })
  
    }

    select(seller : MarketplaceConnectionModel){
      this.selectSeller = seller;
    }

    getRange(){
      this.isLoad = true;
      this.sellers = [];
  
      this.sellerService.getRangeByService(ServicesName.standardAutoresponder, this.marketDeterminantService.getRequired().nameEnum)
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
