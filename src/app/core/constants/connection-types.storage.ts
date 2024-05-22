import { MarketplaceConnectionType } from "../enums/marketplace-connection.enum";
import { ConnectionTypeEnumModel } from "../models/connection-type.model";

export class ConnectionTypesStorage{
    static value : ConnectionTypeEnumModel[] = [
        {
            value : MarketplaceConnectionType.account,
            view : "Аккаунт"
        },
        {
            value : MarketplaceConnectionType.openApi,
            view : "API"
        }
    ]
}