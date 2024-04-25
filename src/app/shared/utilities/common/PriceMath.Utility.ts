export class PriceMathUtility{
    static discountPrice(discount : number, price : number) : number{
        return (1 - (discount/100)) * price;
    }
}