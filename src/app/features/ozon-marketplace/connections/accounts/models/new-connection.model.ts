import { BaseConnectionModel } from "../../../../marketplace-connections/models/marketplace-connection.model";

export interface NewOzonSellerAccountConnectionModel extends BaseConnectionModel{
    sellerId : string;
    refreshToken : string;
}