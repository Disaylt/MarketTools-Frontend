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

@Component({
    selector: 'app-connection',
    standalone: true,
    templateUrl: './connection.component.html',
    styleUrl: './connection.component.scss',
    imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, FormsModule, TemplateFilterPipe, NameFilterPipe, ActiveStatusInfoComponent]
})
export class ConnectionComponent {

  isActive : boolean = false;
  scores : number[] = [];
  searchSellerValue : string = "";
  isLoad : boolean = true;
  selectSeller : MarketplaceConnectionModel | null = null;
  sellers : MarketplaceConnectionModel[] = [];

  @ViewChild(CdkMenu) cdkMenu!: CdkMenu;
  
  constructor(private mapper : ViewMappingService, 
    private sellerService : MarketplaceConnectionsService,
    private marketDeterminantService : MarketDeterminantService){}

  ngOnInit(): void {
    this.scores = this.getScores();
    this.getRange();
  }
  
  select(seller : MarketplaceConnectionModel){
    this.cdkMenu.menuStack.closeAll();
    this.selectSeller = seller;
  }

  getRange(){
    this.isLoad = true;
    this.sellers = [];

    const connectionType = this.getType();

    this.sellerService.getRange(connectionType)
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

  private getScores() : number[]{
    return Array.from({length: 5}, (_, index) => 5 - index);
  }

  private getType() : MarketplaceConnectionType{
    const marketplaceName = this.marketDeterminantService.marketplace;

    switch(marketplaceName.nameEnum){
      case MarketplaceName.wb:
        return MarketplaceConnectionType.wbSellerOpenApi;
      default:
        throw new Error();
    }
  }

}
