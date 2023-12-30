import { Navigation } from "../../models/navigation-bar.model";


export class OzonNavigationStorage{
    private static market = "ozon";
    static value : Navigation[] = [
        {
            iconCode: "dashboard",
            main : {
                name : "Дэшборд",
                path : `${this.market}/info`,
                isDisabled : false
            }
        }
    ]
}