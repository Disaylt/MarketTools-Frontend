import { Route } from "@angular/router";
import { TelegramComponent } from "./telegram.component";
import { InforamtionComponent } from "./inforamtion/inforamtion.component";

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
        }
    ]
} 