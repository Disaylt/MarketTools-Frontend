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
        }
    ]

    static automation : ServicesName[] = [
        ServicesName.standardAutoresponder
    ]

    static monitoring : ServicesName[] = [
        ServicesName.priceMonitoring
    ]
}