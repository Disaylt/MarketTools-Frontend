import { Routes } from "@angular/router";
import { PriceComponent } from "./price/price.component";

export const workspaceRoutes : Routes = [
    {
        path: "price",
        title : "Цены",
        component : PriceComponent
    }
]