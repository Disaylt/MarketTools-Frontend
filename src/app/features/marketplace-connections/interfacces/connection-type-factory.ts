import { MarketplaceConnectionType } from "../../../core/enums/marketplace-connection.enum";

export interface IConnectionTypeFactory{
    get(type : MarketplaceConnectionType) : any
}