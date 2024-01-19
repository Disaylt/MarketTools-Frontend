export interface MarketplaceConnectionModel{
    id : number;
    name : string;
    description : string | null;
    isActive : boolean;
}

export interface DescriptionUpdateBody{
    id : number;
    description : string | null;
}