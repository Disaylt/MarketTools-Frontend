import { Injectable, Injector } from "@angular/core";
import { MarketplaceConnectionType } from "../../../../core/enums/marketplace-connection.enum";
import { NewApiConnectionTypeModalComponent } from "../components/new-api-connection-type-modal/new-api-connection-type-modal.component";
import { IConnectionTypeFactory } from "../../../marketplace-connections/interfacces/connection-type-factory";

@Injectable({
    providedIn: 'root'
  })
export class WbConnectionTypeComponentFactory implements IConnectionTypeFactory{

    constructor(private injector : Injector){}

    get(type : MarketplaceConnectionType) : any{
        switch(type){
            case MarketplaceConnectionType.openApi:
                return this.injector.get(NewApiConnectionTypeModalComponent);
            default:
                return null;
        }
    }
}
  