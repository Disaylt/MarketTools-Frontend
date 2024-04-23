import { Component, OnInit, ViewChild } from '@angular/core';
import { ProgressBarComponent } from "../../../../shared/components/progress-bar/progress-bar.component";
import { CdkMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActiveStatusInfoComponent } from '../../../../shared/components/active-status-info/active-status-info.component';
import { PaginationBarComponent } from '../../../../shared/components/pagination-bar/pagination-bar.component';
import { TabBarButtonComponent } from '../../../../shared/components/tab-bar/tab-bar-button/tab-bar-button.component';
import { TabBarComponent } from '../../../../shared/components/tab-bar/tab-bar.component';
import { NameFilterPipe } from '../../../../shared/pipes/name-filter.pipe';
import { MarketplaceConnectionModel } from '../../../marketplace-connections/models/marketplace-connection.model';
import { MarketplaceConnectionsService } from '../../../marketplace-connections/services/marketplace-connections.service';
import { ServicesName } from '../../../../core/enums/services-name.enum';
import { MarketplaceName } from '../../../../core/enums/marketplace-name';
import { PriceService } from './Services/price.service';
import { PriceDetailsResult } from './models/result.model';
import { finalize, map } from 'rxjs';
import { ProductViewModel } from './models/product-view.model';
import { ProductMapUtility } from './Utilities/ProductMapUtility';
import { ProductComponent } from "./product/product.component";

@Component({
    selector: 'app-price',
    standalone: true,
    templateUrl: './price.component.html',
    styleUrl: './price.component.scss',
    imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, FormsModule, ActiveStatusInfoComponent, ProgressBarComponent, PaginationBarComponent, TabBarComponent, TabBarButtonComponent, NameFilterPipe, ProductComponent]
})
export class PriceComponent implements OnInit {

  selectedConnection : MarketplaceConnectionModel | null = null;
  connections : MarketplaceConnectionModel[] = [];
  searchConnectionName : string = "";

  isLoad = false;
  products : ProductViewModel[] = [];
  
  @ViewChild(CdkMenu) cdkMenu!: CdkMenu;
  constructor(private sellerService : MarketplaceConnectionsService, private priceService : PriceService){}

  ngOnInit(): void {
    this.getConnections();
  }

  selectConnection(connection : MarketplaceConnectionModel){
    this.cdkMenu.menuStack.closeAll();
    this.selectedConnection = connection;
    this.getRange(connection.id);
  }

  getRange(connectionId : number){
    this.isLoad = true;
    this.products = [];

    this.priceService
      .getRange(connectionId)
      .pipe(
        map(x=> {
          const mapper = new ProductMapUtility(x);
          return mapper.map();
        }),
        finalize(() => {
          this.isLoad = false;
        })
      )
      .subscribe({
        next : data => {
          this.products = data;
          console.log(this.products);
        }
      })
  }

  getConnections(){
    this.connections = [];

    this.sellerService.getRangeByService(ServicesName.standardAutoresponder, MarketplaceName.wb)
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
