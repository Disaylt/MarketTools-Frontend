import { Navigation } from "../../models/navigation-bar.model";

export class WbNavigationStorage{
    private static market = "wb";
    static value : Navigation[] = [
        {
            iconCode: "dashboard",
            main : {
                name : "Дэшборд",
                path : `${this.market}/stats`,
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
                    path : `${this.market}/connection/api`,
                    isDisabled : true
                },
                {
                    name : "Кабинет",
                    path : `${this.market}/connection/seller`,
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
        },
        {
            colapseName : "monitoring",
            iconCode: "event_note",
            main : {
                name : "Мониторинг",
                isDisabled : true
            },
            parent : [
                {
                    name : "Цены/СПП/Скидки",
                    path : `${this.market}/monitoring/spp-discount`,
                    isDisabled : false
                },
                {
                    name : "Сток",
                    path : `${this.market}/monitoring/stock`,
                    isDisabled : false
                }
            ]
        },
        {
            colapseName : "analytics",
            iconCode: "equalizer",
            main : {
                name : "Аналитика",
                isDisabled : true
            },
            parent : [
                {
                    name : "Сток",
                    path : `${this.market}/analytics/stock`,
                    isDisabled : true
                }
            ]
        }
    ]
}