import { MarketplaceConnectionType } from "../../../core/enums/marketplace-connection.enum";
import { MarketplaceName } from "../../../core/enums/marketplace-name";

export interface BaseConnectionV2{
    id : number;
    name : string;
    descriptions : string | null;
    baseApiDetails : BaseConnectionType;
    baseAccountDetails : BaseConnectionType;
}

export interface BaseConnectionType{
    isActive : boolean;
}

export interface NewSellecrConnection{
    name : string;
    description : string;
    marketplace : MarketplaceName;
}

export interface NewConnectionDescriptionModel{
    id : number;
    description : string;
}

export interface ActiveteConnectionModel{
    connectionId : number;
    connectionType : MarketplaceConnectionType;
}