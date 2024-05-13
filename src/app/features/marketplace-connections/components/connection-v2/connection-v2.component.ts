import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseConnectionType, BaseConnectionV2, ServiceConnection } from '../../models/marketplace-connections-v2.models';
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
import { MarketplaceConnectionV2Service } from '../../services/marketplace-connection-v2.service';
import { Dialog } from '@angular/cdk/dialog';
import { UpdateDescriptionModalComponent } from '../update-description-modal/update-description-modal.component';
import { NewDescriptionModalV2Component } from '../new-description-modal-v2/new-description-modal-v2.component';

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
  @Input({required : true}) changeTypeEvent! : EventEmitter<MarketplaceConnectionType>;

  @Output() deleted : EventEmitter<BaseConnectionV2> = new EventEmitter<BaseConnectionV2>();

  coonectionTypes : ConnectionTypeEnumModel[] = ConnectionTypesStorage.value;
  selectedConnectionType : ConnectionTypeEnumModel | null = null;
  connectionTypeValue : BaseConnectionType | null = null;

  automation : ServiceDetails[] = [
    
  ]

  monitoring : ServiceDetails[] = [

  ]

  constructor(private connectionService : MarketplaceConnectionV2Service, private dialog: Dialog){}

  openUpdateDescriptionModal(){
    const modal = this.dialog.open(NewDescriptionModalV2Component);
    if(modal.componentInstance){
      modal.componentInstance.data = this.value;
    }
    else{
      modal.close();
    }

    modal.closed
      .subscribe({
        next : data => {
          this.value.description = data as string 
            ?? this.value.description;
        }
      })
  }

  ngOnInit(): void {
    this.changeTypeEvent
      .subscribe(value => {
        const type = this.coonectionTypes
          .find(x=> x.value == value)

        if(type){
          this.selectType(type);
        }
      })
  }

  deleteConnection(){
    if(confirm("Подтвердите удаление подключения")){
      this.connectionService
        .delete(this.value.id)
        .subscribe({
          complete : () => {
            this.deleted.emit(this.value);
          }
        })
    }
  }

  selectType(value : ConnectionTypeEnumModel){
    this.selectedConnectionType = value;
    this.connectionTypeValue = this.getBaseConnectionType(value.value);
    this.setServices();
  }

  setServices(){
    this.automation = []
    this.monitoring = []

    if(this.selectedConnectionType == null){
      return;
    }

    const architectureServices = this.getArchitectureServices();
    this.value
      .services
      .forEach(service => {
        if(architectureServices.some(x=> x == service.type)){
          this.addServiceDetails(service);
        }
      })
  }

  getBaseConnectionType(type : MarketplaceConnectionType) : BaseConnectionType| null{
    switch(type){
      case MarketplaceConnectionType.openApi :
        return this.value.baseApiDetails;
      case MarketplaceConnectionType.account:
        return this.value.baseAccountDetails;
      default :
        return null;
    }
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
        return this.architectureServices.Account;
      case MarketplaceConnectionType.openApi:
        return this.architectureServices.Api;
      default:
        return []
    }
  }
}
