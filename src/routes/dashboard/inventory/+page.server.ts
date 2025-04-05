/**
 * 1. Fetch Inventory
 *  Select all products from product table, where the productId equals the producctId of the record in the studentInventory table, wehere the studentId equaals to the id of the logged in student.
 * 
 */
import { eq } from "drizzle-orm";
import { product as productTable, productCategory as productCategoryTable, type ProductCategory, type Product } from "$lib/server/db/schema/product.js";
import { studentInventory as studentInventoryTable, type StudentInventory } from "$lib/server/db/schema/student.js";
