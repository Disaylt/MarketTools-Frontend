import { PriceApiModel } from "../models/price.model";
import { ProductViewModel, SizeViewModel } from "../models/product-view.model";
import { ProductApiModel } from "../models/product.model";
import { PriceDetailsResult } from "../models/result.model";


export class ProductMapUtility {

    constructor(private productsResult: PriceDetailsResult) { }

    map(): ProductViewModel[] {
        const products: ProductViewModel[] = [];

        this.productsResult.prices
            .forEach(x => {
                const viewProduct = this.mapProduct(x);
                if(viewProduct != null){
                    products.push(viewProduct);
                }
            });

        return products;
    }

    private mapProduct(price: PriceApiModel): ProductViewModel | null {
        const product = this.productsResult
            .products
            .find(x => x.id.toString() == price.article);

        if (product == undefined) {
            return null;
        }

        const viewProduct: ProductViewModel = {
            article: price.article,
            selsellerArticle: price.sellerArticle,
            discount: price.discount,
            lastDiscount: price.discount,
            isCheck: false,
            sizes: []
        };

        price.sizes
            .forEach(size => {
                const sizeDetails = product.sizes
                    .find(x => x.optionId == size.sizeId);

                if (sizeDetails == undefined) {
                    return;
                }

                const viewSize: SizeViewModel = {
                    name: size.name,
                    price: size.price,
                    lastPrice: size.price,
                    sizeId: size.sizeId,
                    canEdit: price.editableSizePrice || size.name == "0",
                    spp : this.mathSpp(size.discountedPrice, sizeDetails.price?.totalReal ?? null),
                    stock : sizeDetails.stocks
                        .map(x=> x.qty)
                        .reduce((a,b) => a + b, 0)
                };
                viewProduct.sizes.push(viewSize);
            });
        
        return viewProduct;
    }

    private mathSpp(discountPrice: number, buyerDiscountPrice: number | null): number {
        if(buyerDiscountPrice == null){
            return 0;
        }
        
        const spp = 100 - buyerDiscountPrice / discountPrice * 100;

        return Math.round(spp);
    }
}
