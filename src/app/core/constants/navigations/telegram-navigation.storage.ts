import { Navigation } from "../../models/navigation-bar.model";

export class TelegramNavigationStorage{
    private static area = "telegram";

    static value : Navigation[] = [
        {
            iconCode: "info",
            main : {
                name : "Информация",
                path : `${this.area}/info`,
                isDisabled : false
            }
        },
        {
            iconCode: "key_vertical",
            main : {
                name : "Токен",
                path : `${this.area}/token`,
                isDisabled : false
            }
        },
        {
            colapseName : "bots",
            iconCode: "robot_2",
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
                    name : "База знаний",
                    path : `${this.area}/bots/1`,
                    isDisabled : true
                }
            ]
        },
    ]
}