/**
 * 1. Fetch Inventory
 *  Select all products from product table, where the productId equals the producctId of the record in the studentInventory table, wehere the studentId equaals to the id of the logged in student.
 * 
 */
import { db } from "$lib/server/db";
import { eq, inArray } from "drizzle-orm";
import { studentInventory as studentInventoryTable } from "$lib/server/db/schema/student.js";
import { product as productTable, type Product } from "$lib/server/db/schema/product.js";

export const load = async ({ locals }) => {
	const studentId = locals?.student?.id || "uuid-placeholder-1234"; // use real auth in prod

	let student_inventory: Product[] = [];

	try {
		const inventoryItems = await db
			.select()
			.from(studentInventoryTable)
			.where(eq(studentInventoryTable.studentId, studentId));

		const productIds = inventoryItems.map((item) => item.productId);

		if (productIds.length > 0) {
			student_inventory = await db
				.select()
				.from(productTable)
				.where(inArray(productTable.id, productIds));
		}
	} catch (error) {
		console.error("Inventory fetch failed:", error);
	}

	return { student_inventory };
};

