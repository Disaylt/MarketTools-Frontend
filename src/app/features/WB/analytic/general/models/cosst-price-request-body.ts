export interface CostPriceRequestBody{
    id : number;
    startDate : Date | null;
    endDate : Date | null;
    value : number
}