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
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, CommonModule, MatIconModule, FormsModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  
  markets : Marketplace[] = MarketplaceStorage.value;
  selectedMarket! : Marketplace;

  selectNavigation : Navigation | null = null;
  marketBar : Navigation[] = [];

  ngOnInit(): void {
    this.firstSelectMarket();
    this.setMarketNavigation();
  }

  setMarketNavigation(){
    switch(this.selectedMarket.nameEnum){
      case MarketplaceName.wb:
        this.marketBar = WbNavigationStorage.value;
        break;
      default:
        this.marketBar = []
    }
  }

  test(nav : Navigation){
    console.log(nav);
    this.selectNavigation = nav;
  }

  private firstSelectMarket(){
    if(this.markets.length > 0){
      this.selectedMarket = this.markets[0];
    }
  }
}
