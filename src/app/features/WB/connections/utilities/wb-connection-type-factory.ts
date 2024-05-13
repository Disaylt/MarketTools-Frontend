import { Injectable, Injector, Type } from "@angular/core";
import { MarketplaceConnectionType } from "../../../../core/enums/marketplace-connection.enum";
import { NewApiConnectionTypeModalComponent } from "../components/new-api-connection-type-modal/new-api-connection-type-modal.component";
import { IConnectionTypeFactory } from "../../../marketplace-connections/interfacces/connection-type-factory";
import { IConnectionTypeComponent } from "../../../marketplace-connections/interfacces/connection-type-component";

@Injectable({
    providedIn: 'root'
  })
export class WbConnectionTypeComponentFactory implements IConnectionTypeFactory{

    constructor(){}

    get(type : MarketplaceConnectionType) : Type<IConnectionTypeComponent> | null{
        switch(type){
            case MarketplaceConnectionType.openApi:
                return NewApiConnectionTypeModalComponent;
            default:
                return null;
        }
    }
}
  