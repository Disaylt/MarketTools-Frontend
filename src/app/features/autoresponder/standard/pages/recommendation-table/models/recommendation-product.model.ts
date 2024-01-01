import { MarketplaceName } from "../../../../../../core/enums/marketplace-name";
import { Pagination } from "../../../../../../core/models/pagination.model";

export interface RecommendationProduct extends RecommendationProductDatails{
    id : number;
}

export interface RecommendationProductCreate extends RecommendationProductDatails{
    marketplaceName : MarketplaceName;
}

export interface QueryRecommendationProducts extends Pagination{
    article : string | null;
    marketplaceName : MarketplaceName;
}

export interface RecommendationProductDatails{
    feedbackArticle : string;
    feedbackProductName : string | null;
    recommendationArticle : string | null;
    recommendationProductName : string | null;
}