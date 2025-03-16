import { db } from "$lib/server/db/index.js";
import { studentProfile as studentProfileTable } from "$lib/server/db/schema/student";
import { product as productTable } from "$lib/server/db/schema/product";
import { eq } from "drizzle-orm";

export const load = async ({locals}) => {
    const studentId = locals.student?.id
    const center = locals.student?.center

    async function getStudentProfile() {
        const data = await db.select().from(studentProfileTable).where(eq(studentProfileTable.studentId, studentId as string))

        return data[0]
    }

    async function getStudentInventory() {


    }

    async function getProducts() {
        const data = await db.select().from(productTable).where(eq(productTable.center, center as string))

        return data
    }

    return {
        student_profile: await getStudentProfile(),
        stuednt_inventory: await getStudentInventory(),
        products: await getProducts()
    }
};