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