export interface MarketplaceConnectionModel{
    id : number;
    name : string;
    description : string | null;
    isActive : boolean;
    autoresponderConnection : ServiceConnectionModel;
}

export interface DescriptionUpdateBody{
    id : number;
    description : string | null;
}

export interface ServiceConnectionModel{
    isActive : boolean;
}