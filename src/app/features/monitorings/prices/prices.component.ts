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
import { ConnectionsService } from '../../ozon-marketplace/connections/accounts/services/connections.service';
import { MarketplaceConnectionModel } from '../../marketplace-connections/models/marketplace-connection.model';
import { finalize } from 'rxjs';
import { ServicesName } from '../../../core/enums/services-name.enum';
import { MarketplaceConnectionsService } from '../../marketplace-connections/services/marketplace-connections.service';

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, FormsModule, TemplateFilterPipe, NameFilterPipe, ActiveStatusInfoComponent, ProgressBarComponent, SpinerComponent, ReversScorePipe, ViewReversScorePipe],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.scss'
})
export class PricesComponent implements OnInit {

  searchSellerValue : string = "";
  isLoad : boolean = true;
  selectSeller : MarketplaceConnectionModel | null = null;
  sellers : MarketplaceConnectionModel[] = [];
  
  constructor(private marketDeterminantService : MarketDeterminantService,
    private sellerService : MarketplaceConnectionsService){
      
    }

    ngOnInit(): void {
      this.getRange();
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
