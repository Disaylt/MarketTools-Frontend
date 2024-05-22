import { Injectable, Type } from "@angular/core";
import { MarketplaceConnectionType } from "../../../../core/enums/marketplace-connection.enum";
import { NewApiConnectionTypeModalComponent } from "../../../WB/connections/components/new-api-connection-type-modal/new-api-connection-type-modal.component";
import { IConnectionTypeComponent } from "../../../marketplace-connections/interfacces/connection-type-component";
import { IConnectionTypeFactory } from "../../../marketplace-connections/interfacces/connection-type-factory";
import { NewAccountTypeComponent } from "../accounts/components/new-account-type/new-account-type.component";

@Injectable({
    providedIn: 'root'
  })
export class OzonConnectionTypeComponentFactory implements IConnectionTypeFactory{

    constructor(){}

    get(type : MarketplaceConnectionType) : Type<IConnectionTypeComponent> | null{
        switch(type){
            case MarketplaceConnectionType.account:
                return NewAccountTypeComponent;
            default:
                return null;
        }
    }
}