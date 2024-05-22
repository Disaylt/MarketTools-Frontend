import { Route } from "@angular/router";
import { OzonMarketplaceComponent } from "./ozon-marketplace.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AccountsComponent } from "./connections/accounts/accounts.component";
import { autoresponderRoutes } from "../autoresponder/autoresponder.routes";
import { ConnectionsV2Component } from "../marketplace-connections/components/connections-v2/connections-v2.component";

export const ozonRoute : Route = 
{
    title : "Ozon",
    path : "ozon",
    component : OzonMarketplaceComponent,
    children : [
        {
            path: "",
            redirectTo : "connections",
            pathMatch : "full"
        },
        {
            title : "Информация",
            path : "info",
            component : DashboardComponent
        },
        {
            title : "Подключения",
            path : "connections",
            component : ConnectionsV2Component
        },
        {
            title : "Автоответчик",
            path : "autoresponder",
            children : autoresponderRoutes
        },
    ]
}