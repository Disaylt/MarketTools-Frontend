import { ImagePathDeterminantUtityli } from "../../../../../shared/utilities/WB/image-path-determinant.utility";
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
            price : 0,
            lastPrice : 0,
            isCheck: false,
            imageUrl : ImagePathDeterminantUtityli.getImagePath(price.article),
            sizes: [],
            stock : 0,
            spp : 0,
            name : product.name,
            canEdit : false,
            brand : product.brand
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
                    canEdit: price.editableSizePrice,
                    spp : this.mathSpp(size.discountedPrice, sizeDetails.price?.totalReal ?? null),
                    stock : sizeDetails.stocks
                        .map(x=> x.qty)
                        .reduce((a,b) => a + b, 0)
                };
                viewProduct.sizes.push(viewSize);
            });

        if(price.editableSizePrice == false && viewProduct.sizes.length > 0){
            const mainSize = viewProduct.sizes[0];
            if(mainSize != undefined){
                viewProduct.price = mainSize.price;
                viewProduct.lastPrice = mainSize.price;
                viewProduct.spp = mainSize.spp;
                viewProduct.canEdit = true;
            }
        }

        viewProduct.stock = viewProduct.sizes
            .map(x=> x.stock)
            .reduce((a,b) => a + b, 0);
        
        viewProduct.sizes = viewProduct.sizes
            .filter(x=> x.name != "0"); 
        
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
