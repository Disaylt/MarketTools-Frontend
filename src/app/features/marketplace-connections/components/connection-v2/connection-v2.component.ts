import { Component, Input, OnInit } from '@angular/core';
import { BaseConnectionV2, ServiceConnection } from '../../models/marketplace-connections-v2.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { ConnectionTypeEnumModel } from '../../../../core/models/connection-type.model';
import { ConnectionTypesStorage } from '../../../../core/constants/connection-types.storage';
import { ActiveStatusInfoComponent } from "../../../../shared/components/active-status-info/active-status-info.component";
import { ArchitectureModel } from '../../models/architecture.model';
import { ServicesName } from '../../../../core/enums/services-name.enum';
import { ServiceDetails } from '../../models/service.model';
import { MarketplaceConnectionType } from '../../../../core/enums/marketplace-connection.enum';
import { ServicesTypeStorage } from '../../../../core/constants/services-type.storage';

@Component({
    selector: 'app-connection-v2',
    standalone: true,
    templateUrl: './connection-v2.component.html',
    styleUrl: './connection-v2.component.scss',
    imports: [CommonModule, FormsModule, CdkMenuTrigger, CdkMenu, CdkMenuItem, ActiveStatusInfoComponent]
})
export class ConnectionV2Component implements OnInit{
  
  @Input({required : true}) value! : BaseConnectionV2;
  @Input({required : true}) architectureServices! : ArchitectureModel;

  coonectionTypes : ConnectionTypeEnumModel[] = ConnectionTypesStorage.value;
  selectedConnectionType : ConnectionTypeEnumModel | null = null;

  automation : ServiceDetails[] = [
    
  ]

  monitoring : ServiceDetails[] = [

  ]

  ngOnInit(): void {
    this.setServices();
  }

  isShowApiActiveStatus(type : MarketplaceConnectionType | undefined){
    return type === MarketplaceConnectionType.openApi;
  }

  isShowAccountActiveStatus(type : MarketplaceConnectionType | undefined){
    return type === MarketplaceConnectionType.account;
  }

  selectType(value : ConnectionTypeEnumModel){
    this.selectedConnectionType = value;
    this.setServices();
  }

  setServices(){
    this.automation = []
    this.monitoring = []

    if(this.selectedConnectionType == null){
      return;
    }

    const architectureServices = this.getArchitectureServices();
    console.log(architectureServices)
    this.value
      .services
      .forEach(service => {
        if(architectureServices.some(x=> x == service.type)){
          this.addServiceDetails(service);
        }
      })
  }

  private addServiceDetails(serviceConnection : ServiceConnection){
    const serviceDetails : ServiceDetails = {
      value : serviceConnection,
      name : ServicesTypeStorage.value.find(x=> x.value == serviceConnection.type)?.viewName ?? "Неизвестный сервис"
    }

    if(ServicesTypeStorage.automation.some(x=> x == serviceConnection.type)){
      this.automation.push(serviceDetails);
    }
    else if(ServicesTypeStorage.monitoring.some(x=> x == serviceConnection.type)){
      this.monitoring.push(serviceDetails);
    }
  }

  private getArchitectureServices() : ServicesName[]{
    if(this.selectedConnectionType == null){
      return [];
    }

    switch(this.selectedConnectionType.value){
      case MarketplaceConnectionType.account:
        console.log(this.selectedConnectionType.value + " - 1")
        return this.architectureServices.Account;
      case MarketplaceConnectionType.openApi:
        return this.architectureServices.Api;
      default:
        console.log(this.selectedConnectionType.value + " - 3")
        return []
    }
  }
}
