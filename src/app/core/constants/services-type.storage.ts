import { ServicesName } from "../enums/services-name.enum";
import { IEnumViewModel } from "../models/enum-view.model";

export class ServicesTypeStorage{


    static value : IEnumViewModel<ServicesName>[] = [
        {
            viewName : "Цены",
            value : ServicesName.priceMonitoring
        },
        {
            viewName : "Станд. автоответчик",
            value : ServicesName.standardAutoresponder
        },
        {
            viewName : "Менеджер цен",
            value : ServicesName.workspacePriceManager
        }
        ,
        {
            viewName : "Общая",
            value : ServicesName.generalAnalytics
        }
    ]

    static analytics : ServicesName[] = [
        ServicesName.generalAnalytics
    ]

    static automation : ServicesName[] = [
        ServicesName.standardAutoresponder
    ]

    static monitoring : ServicesName[] = [
        ServicesName.priceMonitoring
    ]

    static workspace : ServicesName[] = [
        ServicesName.workspacePriceManager
    ]
}