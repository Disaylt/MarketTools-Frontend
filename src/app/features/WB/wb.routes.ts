import { Route, Routes } from "@angular/router";
import { ViewTestComponent } from "../view-test/view-test.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { autoresponderRoutes } from "../autoresponder/autoresponder.routes";
import { WbMarketplaceComponent } from "./wb-marketplace.component";
import { monitoringRoutes } from "../monitorings/monitorings.routes";
import { workspaceRoutes } from "./workspace/workspace.routes";
import { ConnectionsV2Component } from "../marketplace-connections/components/connections-v2/connections-v2.component";
import { analyticRoutes } from "./analytic/analytic.routs";

export const wbRoute : Route =
{
    title : "WB",
    path : "wb",
    component: WbMarketplaceComponent,
    children : [
        {
            path: "",
            redirectTo: "connections",
            pathMatch: "full"
        },
        {
            title : "Информация",
            path : "info",
            component: DashboardComponent
        },
        {
            title : "Автоответчик",
            path : "autoresponder",
            children : autoresponderRoutes
        },
        {
            title : "Подключения",
            path : "connections",
            component : ConnectionsV2Component
        },
        {
            title : "Мониторинг",
            path : "monitoring",
            children : monitoringRoutes
        },
        {
            title : "Workspace",
            path : "workspace",
            children : workspaceRoutes
        },
        {
            title : "Аналитика",
            path : "analytics",
            children : analyticRoutes
        }
    ]
} 