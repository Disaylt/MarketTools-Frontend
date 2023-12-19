import { MarketplaceName } from "../../enums/marketplace-name";
import { Marketplace } from "../../models/marketplace.model";

export class MarketplaceStorage{
    static value : Marketplace[] = [
        {
            nameEnum : MarketplaceName.wb,
            nameView : "WB"
        },
        {
            nameEnum : MarketplaceName.ozon,
            nameView : "OZON"
        }
    ]
}