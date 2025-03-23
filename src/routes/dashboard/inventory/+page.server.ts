import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { product as productTable, type Product } from "$lib/server/db/schema/product";
import { db } from "$lib/server/db/index";

export const actions: Actions = {
    add: async (event) => {
        const formData = await event.request.formData();

        let productData = {
            name: formData.get('name') as string,
            price: parseInt(formData.get('price') as string),
            description: formData.get('description') as string,
            category: formData.get('category') as string,
            center: formData.get('center') as string,
        };

        if (!productData.name || !productData.description || !productData.category || isNaN(productData.price)) {
            return fail(400, { error: "Invalid product data." });
        }

        try {
            const newProduct: Product[] = await db.insert(productTable).values({ ...productData } as Product).returning();

            if (newProduct) {
                return { success: "Successfully added product!" };
            }
        } catch (e) {
            return fail(500, { message: 'An error has occurred. ' + e });
        }
    },
    update: () => {},
    remove: () => {}
};
