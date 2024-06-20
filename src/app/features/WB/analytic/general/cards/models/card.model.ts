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
    promotions : Promotion[];
    searchWords : SearchWord[];
}

export interface SearchWord{
    id : number;
    name : string;
    historyPositions : SearchWordHistoryPosition[];
}

export interface SearchWordHistoryPosition{
    value : number;
    date : string;
}

export interface Promotion{
    name : string;
    dayReports : PromotionReport[]
    cardUseHistories : UseHistory[]

}
export interface PromotionReport{
    price : number;
    date : string;
}

export interface UseHistory{
    date : string;
    isUseCurrentCard : boolean;
    totalCards : number;
}

export interface ComissionModel{
    id : number;
    createDate : Date;
    marketplace : number;
    supplier : number;
    supplierExpress : number;
    paidStorage : number;
    use : WbComissionByCardCategory | null;
}


export interface SizeModel{
    id : number;
    techSize : string;
    sales : SaleModel[];
    orders : OrderModel[];
    prices : PriceModel[];
    stocks : StcokModel[];
    paidStorages : PaidStorageModel[];
    reports : ReportModel[];
}

export interface ReportModel{
    type : WbSaleType;
    logisticCost : number;
    saleDate : string;
}

export interface PaidStorageModel{
    totalPrice : number;
    date : number;
}

export interface StcokModel{
    date : Date;
    total : number;
    inWayFromClient : number;
    quantityFull : number;
    inWayToClient : number;
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