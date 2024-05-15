import { Navigation } from "../../models/navigation-bar.model";


export class OzonNavigationStorage{
    private static market = "ozon";
    static value : Navigation[] = [
        {
            iconCode: "dashboard",
            main : {
                name : "Дэшборд",
                path : `${this.market}/info`,
                isDisabled : true
            }
        },
        {
            iconCode: "device_hub",
            main : {
                name : "Подключение",
                path : `${this.market}/connections`,
                isDisabled : false
            }
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