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
    orders : number;
    ordersCost : number;
    cancels : number;
    canselsCost: number;
    sales : number;
    salesCost : number;
    refounds: number;
    refoundsCost : number;
}