import { Route } from "@angular/router";
import { TelegramComponent } from "./telegram.component";
import { InforamtionComponent } from "./inforamtion/inforamtion.component";
import { TokensComponent } from "./tokens/tokens.component";
import { BotsComponent } from "./bots/bots.component";

export const telegramRoute : Route =
{
    title : "Telegram",
    path : "telegram",
    component: TelegramComponent,
    children : [
        {
            path: "",
            redirectTo: "info",
            pathMatch: "full"
        },
        {
            title : "Информация",
            path : "info",
            component: InforamtionComponent
        },
        {
            title : "Токены",
            path : "token",
            component: TokensComponent
        },
        {
            title : "Боты",
            path : "bots/:id",
            component: BotsComponent
        }
    ]
} 