import { CdkMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarketplaceName } from '../../../../../core/enums/marketplace-name';
import { ServicesName } from '../../../../../core/enums/services-name.enum';
import { ActiveStatusInfoComponent } from '../../../../../shared/components/active-status-info/active-status-info.component';
import { PaginationBarComponent } from '../../../../../shared/components/pagination-bar/pagination-bar.component';
import { ProgressBarComponent } from '../../../../../shared/components/progress-bar/progress-bar.component';
import { TabBarButtonComponent } from '../../../../../shared/components/tab-bar/tab-bar-button/tab-bar-button.component';
import { TabBarComponent } from '../../../../../shared/components/tab-bar/tab-bar.component';
import { NameFilterPipe } from '../../../../../shared/pipes/name-filter.pipe';
import { BaseConnectionV2 } from '../../../../marketplace-connections/models/marketplace-connections-v2.models';
import { MarketplaceConnectionV2Service } from '../../../../marketplace-connections/services/marketplace-connection-v2.service';
import { CheckerComponent } from '../../../workspace/price/checker/checker.component';
import { FilterComponent } from '../../../workspace/price/filter/filter.component';
import { ProductComponent } from '../../../workspace/price/product/product.component';
import { RangePriceChangerComponent } from '../../../workspace/price/range-price-changer/range-price-changer.component';
import { CardsComponent } from '../cards/cards.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, FormsModule, ActiveStatusInfoComponent, ProgressBarComponent, PaginationBarComponent, TabBarComponent, TabBarButtonComponent, NameFilterPipe, ProductComponent, FilterComponent, CheckerComponent, RangePriceChangerComponent, CardsComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  cardsSearch : string = "";

  isLoad : boolean = false;
  selectedConnection : BaseConnectionV2 | null = null;
  connections : BaseConnectionV2[] = [];
  searchConnectionName : string = "";
  
  @ViewChild(CdkMenu) cdkMenu!: CdkMenu;
  
  constructor(private sellerService : MarketplaceConnectionV2Service){
    
  }

  ngOnInit(): void {
    this.getConnections();
  }

  selectConnection(connection : BaseConnectionV2){
    this.cdkMenu.menuStack.closeAll();
    this.selectedConnection = connection;
  }

  getConnections(){
    this.connections = [];

    this.sellerService.getRange(MarketplaceName.wb)
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

  isActivaSeller(connection : BaseConnectionV2){
    return connection.services.some(x=> x.type == ServicesName.generalAnalytics && x.isActive == true);
  }
}
