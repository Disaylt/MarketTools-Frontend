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
import { AbstractConnectionTypeFactroy } from '../../utilities/connection-type-factory';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { SpinerComponent } from "../../../../shared/components/spiner/spiner.component";

@Component({
    selector: 'app-connection-v2',
    standalone: true,
    templateUrl: './connection-v2.component.html',
    styleUrl: './connection-v2.component.scss',
    imports: [CommonModule, FormsModule, CdkMenuTrigger, CdkMenu, CdkMenuItem, ActiveStatusInfoComponent, SpinerComponent]
})
export class ConnectionV2Component implements OnInit{
  
  @Input({required : true}) value! : BaseConnectionV2;
  @Input({required : true}) architectureServices! : ArchitectureModel;
  @Input({required : true}) changeTypeEvent! : EventEmitter<MarketplaceConnectionType>;

  @Output() deleted : EventEmitter<BaseConnectionV2> = new EventEmitter<BaseConnectionV2>();

  coonectionTypes : ConnectionTypeEnumModel[] = ConnectionTypesStorage.value;
  selectedConnectionType : ConnectionTypeEnumModel | null = null;
  connectionTypeValue : BaseConnectionType | null = null;

  isLoad : boolean = false;

  automation : ServiceDetails[] = [
    
  ]

  monitoring : ServiceDetails[] = [

  ]

  workSpace : ServiceDetails[] = [

  ]

  analytic : ServiceDetails[] = [

  ]

  constructor(private connectionService : MarketplaceConnectionV2Service,
    private toastsService : ToastrService,
    private abstractConnectionTypeFactory : AbstractConnectionTypeFactroy,
    private dialog: Dialog){}
    
    changeServiceStatus(service : ServiceConnection){
      this.isLoad = true;



      this.connectionService.changeServiceStatus({
        connectionId : this.value.id,
        isActive : service.isActive,
        service : service.type
      })
      .pipe(finalize(() => {
        this.isLoad = false;
      }))
      .subscribe({
          error : () => {
            service.isActive = !service.isActive;
          }
      })
    }

  activate(type : ConnectionTypeEnumModel, connectionTypeValue : BaseConnectionType){

    this.isLoad = true;

    this.connectionService
      .activate({
        connectionId : this.value.id,
        connectionType : type.value
      })
      .pipe(finalize(() => {
        this.isLoad = false;
      }))
      .subscribe({
        complete : () => {
          connectionTypeValue.isActive = true;
        }
      })
  }

  openUpdateTypeModal(){
    if(this.selectedConnectionType == null){
      return;
    }

    const type = this.abstractConnectionTypeFactory
    .get()
    ?.get(this.selectedConnectionType.value);

    if(type){
      const modal = this.dialog.open(type);
      if(modal.componentInstance){
        modal.componentInstance.id = this.value.id;
        modal.componentInstance.name = this.value.name;
      }

      modal.closed
        .subscribe({
          next: data => {
            const connection = data as BaseConnectionV2;
            if(connection && this.connectionTypeValue){
              this.value.baseAccountDetails.isActive = connection.baseAccountDetails.isActive;
              this.value.baseApiDetails.isActive = connection.baseApiDetails.isActive;
            }
          }
        })
    }
    else{
      this.toastsService.error("Невозможно редактировать данный тип", "", {
        progressBar : true,
        closeButton : true,
        toastClass: "ngx-toastr shadow-none rounded-3 app-error-alert-bg"
    });
    }
  }

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
    this.workSpace = []
    this.analytic = []

    if(this.selectedConnectionType == null){
      return;
    }

    this.getArchitectureServices()
      .forEach(serviceType => {
        this.addServiceDetails(serviceType);
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

  private addServiceDetails(serviceName : ServicesName){

    const serviceConnection = this.value
      .services
      .find(service => service.type == serviceName) ?? null;

    const serviceDetails : ServiceDetails = {
      value : serviceConnection,
      name : ServicesTypeStorage.value.find(x=> x.value == serviceName)?.viewName ?? "Неизвестный сервис"
    }

    if(ServicesTypeStorage.automation.some(x=> x == serviceName)){
      this.automation.push(serviceDetails);
    }
    else if(ServicesTypeStorage.monitoring.some(x=> x == serviceName)){
      this.monitoring.push(serviceDetails);
    }
    else if(ServicesTypeStorage.workspace.some(x=> x == serviceName)){
      this.workSpace.push(serviceDetails);
    }
    else if(ServicesTypeStorage.analytics.some(x=> x == serviceName)){
      this.analytic.push(serviceDetails);
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
