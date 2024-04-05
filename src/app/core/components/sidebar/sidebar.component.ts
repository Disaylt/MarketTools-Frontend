import { CommonModule, NgForOf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { TelegramNavigationStorage } from '../../constants/navigations/telegram-navigation.storage';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, CommonModule, MatIconModule, FormsModule, RouterModule, CdkMenuTrigger, CdkMenu, CdkMenuItem],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  
  @ViewChild(CdkMenu) cdkMenu!: CdkMenu;
  markets : Marketplace[] = MarketplaceStorage.value;
  lastSelectMarket : Marketplace | null = null;

  marketBar : Navigation[] = [];

  constructor(private router : Router, public marketDeterminantService : MarketDeterminantService){}

  ngOnInit(): void {
    this.marketDeterminantService.toggleEvent
      .subscribe(x=> {
        this.setMarketNavigation(x);
      })
  }

  chooseMenu(value : Marketplace){
    this.marketDeterminantService.set(value);
    this.cdkMenu.menuStack.closeAll();
  }

  setMarketNavigation(value : Marketplace){
    let routeLink = "";
    switch(value.nameEnum){
      case MarketplaceName.wb:
        this.marketBar = WbNavigationStorage.value;
        routeLink = "dashboard/wb"
        break;
      case MarketplaceName.ozon:
        this.marketBar = OzonNavigationStorage.value;
        routeLink = "dashboard/ozon"
        break;
      case MarketplaceName.telegram:
          this.marketBar = TelegramNavigationStorage.value;
          routeLink = "dashboard/telegram/info"
          break;
      default:
        this.marketBar = WbNavigationStorage.value;
        break;
    }

    if(value != this.lastSelectMarket && this.lastSelectMarket != null){
      this.router.navigate([routeLink]);
    }

    this.lastSelectMarket = value;
  }
}
