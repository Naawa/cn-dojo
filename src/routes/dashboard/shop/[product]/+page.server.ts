import { db } from "$lib/server/db";
import { productImage as productImageTable, product as productTable, type Product, type ProductImage } from "$lib/server/db/schema/product.js";
import { and, eq } from "drizzle-orm";


export const load = async ({ params }) => {
    let productId = parseInt(params.product)

    async function getProduct() {
        let product: Product | null = null
        try {
            if (productId) {
                let data = await db.select().from(productTable).where(and(
                    eq(productTable.id,
                        productId
                    )))
                if (data) {
                    product = data[0]
                }
            }
        }
        catch (e) {
            return product
        }
        return product
    }

    async function getProductImages() {
        let productImages: ProductImage[] | null = null
        try {
            if (productId) {
                let data = await db.select().from(productImageTable).where(and(
                    eq(productImageTable.productId,
                        productId
                    )))
                if (data) {
                    productImages = data
                }
            }
        }
        catch (e) {
            return productImages
        }
        return productImages
    }

    return {
        product: await getProduct(),
        productImages: await getProductImages()
    }
};

export const actions = {
    //**
    // Add product to inventory..
    //  */
};