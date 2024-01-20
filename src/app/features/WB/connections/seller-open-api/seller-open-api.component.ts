import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { NewConnectionModalComponent } from './components/new-connection-modal/new-connection-modal.component';
import { MarketplaceConnectionsService } from '../../../marketplace-connections/services/marketplace-connections.service';
import { MarketplaceConnectionType } from '../../../../core/enums/marketplace-connection.enum';
import { MarketplaceConnectionModel } from '../../../marketplace-connections/models/marketplace-connection.model';
import { WbSellerOpenApiConnectionComponent } from "./components/wb-seller-open-api-connection/wb-seller-open-api-connection.component";
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from "../../../../shared/components/progress-bar/progress-bar.component";
import { finalize } from 'rxjs';
import { PaginationBarComponent } from "../../../../shared/components/pagination-bar/pagination-bar.component";

@Component({
    selector: 'app-seller-open-api',
    standalone: true,
    templateUrl: './seller-open-api.component.html',
    styleUrl: './seller-open-api.component.scss',
    imports: [WbSellerOpenApiConnectionComponent, CommonModule, ProgressBarComponent, PaginationBarComponent]
})
export class SellerOpenApiComponent implements OnInit {

  isLoad : boolean = false;
  connections : MarketplaceConnectionModel[] = [];
  
  constructor(private dialog: Dialog, private marketplaceConnectionService : MarketplaceConnectionsService){}

  ngOnInit(): void {
    this.isLoad = true;

    this.marketplaceConnectionService.getRange(MarketplaceConnectionType.wbSellerOpenApi)
      .pipe(
        finalize(()=> {
          this.isLoad = false;
        })
      )
      .subscribe({
        next : data => {
          this.connections = data;
        }
      })
  }

  delete(id : number){
    this.connections = this.connections.filter(x=> x.id != id);
  }

  openAddModal(){
    const modal = this.dialog.open(NewConnectionModalComponent);
    modal.closed.subscribe({
      next : data => {
        const newConnection = data as MarketplaceConnectionModel;

        if(newConnection){
          this.connections.push(newConnection);
        }
      }
    })
  }
}
