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
import { FilterComponent } from "./filter/filter.component";
import { Filter } from './models/filter.model';
import { FilterUtility } from './Utilities/default-filter.utility';
import { CheckerComponent } from "./checker/checker.component";
import { RangePriceChangerComponent } from "./range-price-changer/range-price-changer.component";
import { Dialog } from '@angular/cdk/dialog';
import { ReportModalComponent } from './report-modal/report-modal.component';

@Component({
    selector: 'app-price',
    standalone: true,
    templateUrl: './price.component.html',
    styleUrl: './price.component.scss',
    imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, FormsModule, ActiveStatusInfoComponent, ProgressBarComponent, PaginationBarComponent, TabBarComponent, TabBarButtonComponent, NameFilterPipe, ProductComponent, FilterComponent, CheckerComponent, RangePriceChangerComponent]
})
export class PriceComponent implements OnInit {

  filter : Filter;

  selectedConnection : MarketplaceConnectionModel | null = null;
  connections : MarketplaceConnectionModel[] = [];
  searchConnectionName : string = "";

  isLoad = false;
  products : ProductViewModel[] = [];
  filterProducts : ProductViewModel[] = [];
  viewProducts : ProductViewModel[] = [];
  
  @ViewChild(PaginationBarComponent) paginationBar! : PaginationBarComponent;
  @ViewChild(CdkMenu) cdkMenu!: CdkMenu;
  constructor(private sellerService : MarketplaceConnectionsService, 
    private priceService : PriceService,
    private dialog: Dialog)
  {
    this.filter = FilterUtility.getDefault();
  }

  ngOnInit(): void {
    this.getConnections();
  }

  operReportModal(){
    const modal = this.dialog.open(ReportModalComponent);
    if(modal.componentInstance){
      modal.componentInstance.products = this.products;
    }
  }

  selectConnection(connection : MarketplaceConnectionModel){
    this.cdkMenu.menuStack.closeAll();
    this.selectedConnection = connection;
    this.getRange(connection.id);
  }

  changePage(){
    const skip = this.paginationBar.paginationDetails.skip;
    const take = this.paginationBar.paginationDetails.take;
    this.viewProducts = this.filterProducts
      .slice(skip, skip + take);
    this.paginationBar.updateTotal(this.filterProducts.length);
  }

  getRange(connectionId : number){
    this.isLoad = true;
    this.products = [];
    this.filterProducts = [];
    this.changePage();

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
          this.setFilterProducts();
          this.changePage();
        }
      })
  }

  setFilterProducts(){
    this.filterProducts = this.products
      .filter(x=> {
        let value = x.price >= this.filter.minPrice
          && x.price <= this.filter.maxPrice
          && x.discount >= this.filter.minDiscount
          && x.discount <= this.filter.maxDiscount
          && x.stock >= this.filter.minStock
          && x.stock <= this.filter.maxStock
          && x.article.includes(this.filter.article)
          && x.name.toLowerCase().includes(this.filter.name.toLowerCase())
          && x.selsellerArticle.toLowerCase().includes(this.filter.sellerArticle.toLowerCase())
          && x.brand.toLowerCase().includes(this.filter.brand.toLowerCase());
        
        if(this.filter.isSelected){
          value = value && x.isCheck
        }

        if(this.filter.isChangeDiscount){
          value = value && x.discount != x.lastDiscount
        }

        if(this.filter.isChangePrice){
          value = value && (x.price != x.lastPrice || x.sizes.some(size => size.price != size.lastPrice))
        }

        if(this.filter.canEditSize){
          value = value && x.editableSizePrice
        }
        
        return value;
      });
    this.changePage();
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
