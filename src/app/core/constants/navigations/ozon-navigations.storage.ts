import { Navigation } from "../../models/navigation-bar.model";


export class OzonNavigationStorage{
    private static market = "ozon";
    static value : Navigation[] = [
        {
            iconCode: "dashboard",
            main : {
                name : "Дэшборд",
                path : `${this.market}/info`,
                isDisabled : false
            }
        },
        {
            colapseName : "connection",
            iconCode: "device_hub",
            main : {
                name : "Подключение",
                isDisabled : false
            },
            parent : [
                {
                    name : "API",
                    path : `${this.market}/connections/seller/open-api`,
                    isDisabled : true
                },
                {
                    name : "Кабинет",
                    path : `${this.market}/connections/seller/account`,
                    isDisabled : false
                }
            ]
        },
        {
            colapseName : "autoresponder",
            iconCode: "forum",
            main : {
                name : "Автоответчик",
                isDisabled : false
            },
            parent : [
                {
                    name : "Стандартный",
                    path : `${this.market}/autoresponder/standard`,
                    isDisabled : false
                },
                {
                    name : "Нейросеть",
                    path : `${this.market}/autoresponder/neural-network`,
                    isDisabled : true
                }
            ]
        }
    ]
}