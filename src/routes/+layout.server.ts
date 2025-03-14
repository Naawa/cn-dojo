import { db } from "$lib/server/db";
import { center as centerTable, type Center} from "$lib/server/db/schema/center.js";
import { student as studentTable, studentProfile as studentProfileTable, type Student, type StudentProfile } from "$lib/server/db/schema/student";
import { eq } from "drizzle-orm";

export const load = async ({ locals }) => {
};