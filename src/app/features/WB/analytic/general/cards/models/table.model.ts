export interface ColumnModel{
    title : string;
    date : Date;
    costPrice: number;
    totalPrice : number;
    sellerDiscount : number;
    sellerPrice : number;
    buyerDiscount : number;
    buyerPrice : number;
    stock : number;
    inWayFromClient : number;
    quantityFull : number;
    inWayToClient : number;
    orders : number;
    ordersCost : number;
    cancels : number;
    canselsCost: number;
    sales : number;
    salesCost : number;
    refounds: number;
    refoundsCost : number;
    comission : number | null;
    sumSalesComission : number;
    paidStoragePrice : number;
    saleLogistic : number;
    returnedLogistic : number;
    fullLogistic : number;
    marginPercent : number | null;
    marginCurrency : number;
    marginWithoutPromotionPercent : number | null;
    marginWithoutPromotionCurrency : number;
    turnover : number;
    promotionCost : number;
}

export interface SearchWordRow{
    name : string;
    id : number;
    columns : SearchWordColumn[]
}

export interface SearchWordColumn{
    title : string;
    date : Date;
    value: number | null;
}

export interface PromotionRow{
    name : string;
    columns : PromotionColumn[]
}

export interface PromotionColumn{
    title : string;
    date : Date;
    value : number;
}

export interface DateSearchWordColumns{
    startDate : Date | null;
    endDate : Date | null;
    dateValue : number;
    columns : SearchWordColumn[]
}

export interface DatePromotionColumns{
    startDate : Date | null;
    endDate : Date | null;
    dateValue : number;
    columns : PromotionColumn[]
}

export interface DateColumnsModel{
    startDate : Date | null;
    endDate : Date | null;
    dateValue : number;
    columns : ColumnModel[]
}