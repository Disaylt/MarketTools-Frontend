import { Navigation } from "../../models/navigation-bar.model";

export class WbNavigationStorage{
    private static market = "wb";
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
        },
        {
            colapseName : "monitoring",
            iconCode: "event_note",
            main : {
                name : "Мониторинг",
                isDisabled : false
            },
            parent : [
                {
                    name : "Цены",
                    path : `${this.market}/monitoring/price`,
                    isDisabled : false
                },
                {
                    name : "Сток",
                    path : `${this.market}/monitoring/stock`,
                    isDisabled : true
                }
            ]
        },
        {
            colapseName : "analytics",
            iconCode: "equalizer",
            main : {
                name : "Аналитика",
                isDisabled : false
            },
            parent : [
                {
                    name : "Общая",
                    path : `${this.market}/analytics/general/menu`,
                    isDisabled : false
                },
                {
                    name : "Сток",
                    path : `${this.market}/analytics/stock`,
                    isDisabled : true
                }
            ]
        },
        {
            colapseName : "workspace",
            iconCode: "workspaces",
            main : {
                name : "Workspace",
                isDisabled : false
            },
            parent : [
                {
                    name : "Цены",
                    path : `${this.market}/workspace/price`,
                    isDisabled : false
                }
            ]
        }
    ]
}