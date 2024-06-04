import { Component, ViewChild } from '@angular/core';
import { MarketplaceConnectionV2Service } from '../../../marketplace-connections/services/marketplace-connection-v2.service';
import { BaseConnectionV2 } from '../../../marketplace-connections/models/marketplace-connections-v2.models';
import { MarketplaceName } from '../../../../core/enums/marketplace-name';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { ActiveStatusInfoComponent } from '../../../../shared/components/active-status-info/active-status-info.component';
import { PaginationBarComponent } from '../../../../shared/components/pagination-bar/pagination-bar.component';
import { ProgressBarComponent } from '../../../../shared/components/progress-bar/progress-bar.component';
import { TabBarButtonComponent } from '../../../../shared/components/tab-bar/tab-bar-button/tab-bar-button.component';
import { TabBarComponent } from '../../../../shared/components/tab-bar/tab-bar.component';
import { NameFilterPipe } from '../../../../shared/pipes/name-filter.pipe';
import { CheckerComponent } from '../../workspace/price/checker/checker.component';
import { FilterComponent } from '../../workspace/price/filter/filter.component';
import { ProductComponent } from '../../workspace/price/product/product.component';
import { RangePriceChangerComponent } from '../../workspace/price/range-price-changer/range-price-changer.component';
import { asapScheduler } from 'rxjs';
import { ServicesName } from '../../../../core/enums/services-name.enum';
import { CardsComponent } from "./cards/cards.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
    selector: 'app-general',
    standalone: true,
    templateUrl: './general.component.html',
    styleUrl: './general.component.scss',
    imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, FormsModule, ActiveStatusInfoComponent, ProgressBarComponent, PaginationBarComponent, TabBarComponent, TabBarButtonComponent, NameFilterPipe, ProductComponent, FilterComponent, CheckerComponent, RangePriceChangerComponent, CardsComponent]
})
export class GeneralComponent {

}
