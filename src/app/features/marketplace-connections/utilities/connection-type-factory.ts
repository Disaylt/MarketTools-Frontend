import { Injectable, Injector } from "@angular/core";
import { MarketDeterminantService } from "../../../core/services/market-determinant.service";
import { IConnectionTypeFactory } from "../interfacces/connection-type-factory";
import { MarketplaceName } from "../../../core/enums/marketplace-name";
import { WbConnectionTypeComponentFactory } from "../../WB/connections/utilities/wb-connection-type-factory";
import { MarketplaceConnectionType } from "../../../core/enums/marketplace-connection.enum";

@Injectable({
    providedIn: 'root'
  })
export class AbstractConnectionTypeFactroy{
    
    constructor(private injector : Injector, private determinantService : MarketDeterminantService){}

    get() : IConnectionTypeFactory | null{
        switch(this.determinantService.getRequired().nameEnum){
            case MarketplaceName.wb:
                return this.injector.get(WbConnectionTypeComponentFactory);
            default :
                return null;
        }
    }
}