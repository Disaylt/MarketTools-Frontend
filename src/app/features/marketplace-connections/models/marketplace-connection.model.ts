export interface BaseConnectionModel{
    name : string;
    description : string | null;
}

export interface MarketplaceConnectionModel extends BaseConnectionModel{
    id : number;
    isActive : boolean;
    autoresponderConnection : ServiceConnectionModel;
    priceMonitoringConnection : ServiceConnectionModel;
}

export interface DescriptionUpdateBody{
    id : number;
    description : string | null;
}

export interface ServiceConnectionModel{
    isActive : boolean;
}