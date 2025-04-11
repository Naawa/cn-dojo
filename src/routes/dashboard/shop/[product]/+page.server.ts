import { db } from "$lib/server/db";
import { productImage as productImageTable, product as productTable, type Product, type ProductImage } from "$lib/server/db/schema/product.js";
import { studentInventory, studentInventory as studentInventoryTable, type StudentInventory } from "$lib/server/db/schema/student.js";
import { and, eq } from "drizzle-orm";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

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
	addToInventory: async ({ request, locals }) => {
		const formData = await request.formData();
		const productId = parseInt(formData.get("productId") as string);
		const studentId = locals.student?.id;

		if (!studentId || !productId) return { error: "Missing data" };

		try {
			await db.insert(studentInventory).values({
                studentId,
                productId,
                id: 0
            }satisfies StudentInventory);
            
			return { success: "Product added to inventory!" };
		} catch (e) {
			console.error("Error adding to inventory:", e);
			return fail(500, { error: "Failed to add product to inventory." });
		}
	}
};

