import { db } from "$lib/server/db";
import { product as productTable, type Product } from "$lib/server/db/schema/product.js";
import { and, eq } from "drizzle-orm";


export const load = async ({ params, locals }) => {
    let admin = locals.admin;

    let productId = parseInt(params.product)

    async function getProduct() {
        let product: Product | null = null
        try {
            if (admin?.center) {
                let data = await db.select().from(productTable).where(and(
                    eq(productTable.center,
                        admin.center
                    ),
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

    return {
        product: await getProduct()
    }
};