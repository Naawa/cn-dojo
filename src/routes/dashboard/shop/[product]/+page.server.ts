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

		// Get student ID from session/local (or use a fallback during development)
		const studentId = locals?.student?.id || "uuid-placeholder-1234"; // update in production

		if (!studentId || !productId) {
			return fail(400, { error: "Missing student or product ID" });
		}

		try {
			await db.insert(studentInventoryTable).values({
				studentId,
				productId
			});

			return { success: true };
		} catch (e) {
			console.error("Insert failed:", e);
			return fail(500, { error: "Failed to add product to inventory." });
		}
	}
};

