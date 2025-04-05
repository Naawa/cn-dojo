import { db } from "$lib/server/db/index.js";
import { studentProfile as studentProfileTable } from "$lib/server/db/schema/student";
import { product as productTable, type Product } from "$lib/server/db/schema/product";
import { eq } from "drizzle-orm";
import { studentInventory as studentInventoryTable, type StudentInventory } from "$lib/server/db/schema/student.js";

export const load = async ({ locals }) => {
    const studentId = locals.student?.id
    const center = locals.student?.center

    async function getStudentProfile() {
        const data = await db.select().from(studentProfileTable).where(eq(studentProfileTable.studentId, studentId as string))

        return data[0]
    }



    async function getStudentInventory() {
        const studentId = locals.student?.id

        let inventory: { product: Product, student_inventory: StudentInventory }[] | null = null
        try {
            if (studentId) {
                let data = await db.select().from(studentInventoryTable).where(eq(studentInventoryTable.studentId,
                    studentId
                )).innerJoin(productTable, eq(studentInventoryTable.productId, productTable.id))
                if (data) {
                    inventory = data
                }
            }
        }
        catch (e) {
            return inventory
        }
        return inventory
    }

    async function getProducts() {
        const data = await db.select().from(productTable).where(eq(productTable.center, center as string))

        return data
    }

    return {
        student_profile: await getStudentProfile(),
        student_inventory: await getStudentInventory(),
        products: await getProducts()
    }
};