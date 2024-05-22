import { Type } from "@angular/core";
import { MarketplaceConnectionType } from "../../../core/enums/marketplace-connection.enum";
import { IConnectionTypeComponent } from "./connection-type-component";

export interface IConnectionTypeFactory{
    get(type : MarketplaceConnectionType) : Type<IConnectionTypeComponent> | null
}