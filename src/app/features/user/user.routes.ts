import { Route } from "@angular/router";
import { NotificationsComponent } from "./notifications/notifications.component";

export const userRoute : Route = {
    title : "Пользователь",
    path : "user",
    children :[
        {
            path : "notifications",
            title : "Уведомления",
            component : NotificationsComponent
        }
    ]
}