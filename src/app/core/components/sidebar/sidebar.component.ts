import { CommonModule, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { Marketplace } from '../../models/marketplace.model';
import { MarketplaceStorage } from '../../constants/navigations/marketpkaces.storage';
import { FormsModule } from '@angular/forms';
import { Navigation, NavigationValue } from '../../models/navigation-bar.model';
import { MarketplaceName } from '../../enums/marketplace-name';
import { WbNavigationStorage } from '../../constants/navigations/wb-navigations.storage';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MarketDeterminantService } from '../../services/market-determinant.service';
import { timeout } from 'rxjs';
import { OzonNavigationStorage } from '../../constants/navigations/ozon-navigations.storage';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, CommonModule, MatIconModule, FormsModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  
  markets : Marketplace[] = MarketplaceStorage.value;
  lastSelectMarket : Marketplace | null = null;

  marketBar : Navigation[] = [];

  constructor(private router : Router, public marketDeterminantService : MarketDeterminantService){}

  ngOnInit(): void {
    this.marketDeterminantService.toggleEvent
      .subscribe(x=> {
        this.setMarketNavigation();
      })
      this.setMarketNavigation();
  }

  setMarketNavigation(){
    let routeLink = "";
    switch(this.marketDeterminantService.marketplace.nameEnum){
      case MarketplaceName.wb:
        this.marketBar = WbNavigationStorage.value;
        routeLink = "dashboard/wb"
        break;
      case MarketplaceName.ozon:
        this.marketBar = OzonNavigationStorage.value;
        routeLink = "dashboard/ozon"
        break;
      default:
        this.marketBar = [];
        this.router.navigate(["dashboard/marketpalce-not-found"]);
    }

    if(this.lastSelectMarket != null && this.marketDeterminantService.marketplace != this.lastSelectMarket){
      this.router.navigate([routeLink]);
    }

    this.lastSelectMarket = this.marketDeterminantService.marketplace;
  }
}
