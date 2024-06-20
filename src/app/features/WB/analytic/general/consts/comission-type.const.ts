import { WbComissionByCardCategory } from "../cards/models/card.model";

export class ComissionTypeStorage{
    static getName(value : WbComissionByCardCategory) : string{
        switch(value){
            case WbComissionByCardCategory.marketplace:
                return "Склад продавца > WB"
            case WbComissionByCardCategory.supplier:
                return "Склад продавца > Клиент"
            case WbComissionByCardCategory.supplierExpress:
                return "Склад продавца > Клиент(Экспресс)"
            case WbComissionByCardCategory.paidStorage:
                return "Склад WB"
            default:
                return "Неизвестно"
        }
    }
}