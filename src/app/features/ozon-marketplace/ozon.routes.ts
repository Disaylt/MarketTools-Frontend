import { Route } from "@angular/router";
import { OzonMarketplaceComponent } from "./ozon-marketplace.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AccountsComponent } from "./connections/accounts/accounts.component";
import { autoresponderRoutes } from "../autoresponder/autoresponder.routes";

export const ozonRoute : Route = 
{
    title : "Ozon",
    path : "ozon",
    component : OzonMarketplaceComponent,
    children : [
        {
            path: "",
            redirectTo : "info",
            pathMatch : "full"
        },
        {
            title : "Информация",
            path : "info",
            component : DashboardComponent
        },
        {
            path : "connections/seller",
            children : 
            [
                {
                    path : "account",
                    title : "Аккаунты",
                    component : AccountsComponent
                }
            ]
        },
        {
            title : "Автоответчик",
            path : "autoresponder",
            children : autoresponderRoutes
        },
    ]
}