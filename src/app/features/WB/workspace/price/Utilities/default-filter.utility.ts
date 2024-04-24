import { Filter } from "../models/filter.model";

export class FilterUtility{
    static getDefault() : Filter
    {
        return {
            article : "",
            sellerArticle : "",
            name : "",
            brand : "",
            minStock : 0,
            maxStock : 999999,
            minPrice: 0,
            maxPrice: 999999,
            minDiscount : 0,
            maxDiscount : 99,
        
            isSelected : false,
            isChangePrice : false,
            isChangeDiscount : false,
            canEditSize : false,
          }
    }

    static reset(filter : Filter){
        filter.article = "",
        filter.sellerArticle = ""
        filter.name = ""
        filter.brand = ""
        
        filter.minStock = 0;
        filter.maxStock = 999999;
        filter.minPrice = 0;
        filter.maxPrice = 999999;
        filter.minDiscount = 0;
        filter.maxDiscount = 99;
    
        filter.isSelected = false;
        filter.isChangePrice = false;
        filter.isChangeDiscount = false;
        filter.canEditSize = false;
    }
}