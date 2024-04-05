import { Navigation } from "../../models/navigation-bar.model";

export class TelegramNavigationStorage{
    private static area = "telegram";

    static value : Navigation[] = [
        {
            iconCode: "dashboard",
            main : {
                name : "Информация",
                path : `${this.area}/info`,
                isDisabled : false
            }
        },
        {
            colapseName : "connection",
            iconCode: "device_hub",
            main : {
                name : "Боты",
                isDisabled : false
            },
            parent : [
                {
                    name : "Мониторинг",
                    path : `${this.area}/bots/0`,
                    isDisabled : false
                },
                {
                    name : "Донаты",
                    path : `${this.area}/bots/1`,
                    isDisabled : true
                }
            ]
        },
    ]
}