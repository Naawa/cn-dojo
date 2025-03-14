import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types.js";
import { validateName } from "$lib/server/validation";
import { product as productTable, productCategory as productCategoryTable, type ProductCategory, type Product } from "$lib/server/db/schema/product.js";
import { db } from "$lib/server/db/index.js";
import { eq } from "drizzle-orm";
import { put } from "@vercel/blob";

export const load: PageServerLoad = async ({ locals }) => {
    let admin = locals.admin;

    async function getProducts() {
        let products: Product[] | null = null
        try {
            if (admin?.center) {
                let data = await db.select().from(productTable).where(eq(productTable.center,
                    admin.center
                ))
                if (data) {
                    products = data
                }
            }
        }
        catch (e) {
            return products
        }
        return products
    }

    async function getCategories() {
        let categories: ProductCategory[] | null = null
        try {
            let data = await db.select().from(productCategoryTable)
            if (data) {
                categories = data
            }
        }
        catch (e) {
            return categories
        }
        return categories
    }

    return { products: await getProducts(), admin, categories: await getCategories() };
};

export const actions: Actions = {
    add: async (event) => {
        const formData = await event.request.formData();

        let productData = {
            name: formData.get('productName') as string,
            price: parseFloat(formData.get('price') as string),
            category: formData.get('category') as string,
            image: formData.get('image') as File
        };

        if (!validateName(productData.name)) {
            return fail(400, { error: "Invalid product name." });
        }

        if (isNaN(productData.price)) {
            return fail(400, { error: "Invalid price." });
        }

        if(!productData.image) {
            return fail(400, { error: "Please upload an image!" });
        }

        // Insert into database (mocked for now)
        console.log("New product added:", productData);
        let url = ""
        // const { url } = await put(productData.image.name, productData.image, { access: "public" });

        return { success: "Successfully added product!", imageUrl: url };
    },
    update: () => { },
    remove: () => { }
};
