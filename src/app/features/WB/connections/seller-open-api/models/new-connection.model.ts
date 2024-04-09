import { BaseConnectionModel } from "../../../../marketplace-connections/models/marketplace-connection.model";

export interface NewWbSellerApiConnectionModel extends BaseConnectionModel{
    token : string;
}