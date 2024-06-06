export interface CardModel{
    id : number;
    article : number;
    groupId : number;
    subjectId : number;
    uId : string;
    vendorCode : string;
    name : string;
    brand : string;
    title : string;
    mainPhotoUrl : string | null;

    length : number;
    width : number;
    height : number;

    isCombineSizes : boolean;
}

export interface AnalyticCardModel extends CardModel{
    sizes : SizeModel[]
    comissions : ComissionModel[];
}

export interface ComissionModel{
    id : number;
    createDate : Date;
    marketplace : number;
    supplier : number;
    supplierExperss : number;
    paidStorage : number;
    use : WbComissionByCardCategory;
}

export interface SizeModel{
    techSize : string;
    sales : SaleModel[];
    orders : OrderModel[];
    prices : PriceModel[];
    stocks : StcokModel[];
}

export interface StcokModel{
    date : Date;
    total : number;
}

export interface PriceModel{
    createDate : Date;
    costPrice : number;
    sellerPrice : number;
    sellerDiscount : number;
    buyerDiscount : number;
}

export interface OrderModel{
    date : Date;
    countFinishedPrice : number;
    count : number;
    isCancel : boolean;
}

export interface SaleModel{
 type : WbSaleType;
 date : Date;
 countFinishedPrice : number;
 count : number;
}

export enum WbComissionByCardCategory{
    marketplace,
    supplier,
    supplierExpress,
    paidStorage
}

export enum WbSaleType{
    sale,
    refound
}