import { MarketplaceName } from "../../../../../../core/enums/marketplace-name";
import { Pagination } from "../../../../../../core/models/pagination.model";

export interface RecoomendationProduct extends RecoomendationProductDatails{
    id : number;
    marketplaceName : MarketplaceName;
}

export interface RecommendationProductCreate extends RecoomendationProductDatails{
    marketplaceName : MarketplaceName;
}

export interface RecommendationProductUpdate extends RecoomendationProductDatails{
    id : number;
}

export interface QueryRecommendationProducts extends Pagination{
    article : string | null;
    marketplaceName : MarketplaceName;
}

interface RecoomendationProductDatails{
    feedbackArticle : string;
    feedbackProductName : string | null;
    recommendationArticle : string | null;
    recommendationProductName : string | null;
}