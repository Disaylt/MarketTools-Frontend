import { MarketplaceConnectionType } from "../../../core/enums/marketplace-connection.enum";
import { MarketplaceName } from "../../../core/enums/marketplace-name";
import { ServicesName } from "../../../core/enums/services-name.enum";

export interface BaseConnectionV2{
    id : number;
    name : string;
    description : string | null;
    baseApiDetails : BaseConnectionType;
    baseAccountDetails : BaseConnectionType;
    services : ServiceConnection[]
}

export interface ServiceConnection{
    isActive : boolean;
    type : ServicesName
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

export interface ActivateConnectionModel{
    connectionId : number;
    connectionType : MarketplaceConnectionType;
}