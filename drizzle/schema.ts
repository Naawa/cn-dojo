import { pgTable, foreignKey, unique, uuid, text, serial, integer, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const admin = pgTable("admin", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	email: text().notNull(),
	passwordHash: text("password_hash").notNull(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	center: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.center],
			foreignColumns: [center.location],
			name: "admin_center_center_location_fk"
		}),
	unique("admin_email_unique").on(table.email),
]);

export const productImage = pgTable("product_image", {
	id: serial().primaryKey().notNull(),
	productId: serial("product_id").notNull(),
	source: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.productId],
			foreignColumns: [product.id],
			name: "product_image_product_id_product_id_fk"
		}),
	unique("product_image_source_unique").on(table.source),
]);

export const center = pgTable("center", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	location: text().notNull(),
}, (table) => [
	unique("center_location_unique").on(table.location),
]);

export const studentInventory = pgTable("student_inventory", {
	id: serial().primaryKey().notNull(),
	productId: serial("product_id").notNull(),
	studentId: uuid("student_id"),
}, (table) => [
	foreignKey({
			columns: [table.productId],
			foreignColumns: [product.id],
			name: "student_inventory_product_id_product_id_fk"
		}),
	foreignKey({
			columns: [table.studentId],
			foreignColumns: [student.id],
			name: "student_inventory_student_id_student_id_fk"
		}),
]);

export const product = pgTable("product", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	price: integer().notNull(),
	description: text().notNull(),
	category: text(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	center: text().notNull(),
	imageUrl: text("image_url").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.category],
			foreignColumns: [productCategory.category],
			name: "product_category_product_category_category_fk"
		}),
	foreignKey({
			columns: [table.center],
			foreignColumns: [center.location],
			name: "product_center_center_location_fk"
		}),
]);

export const productCategory = pgTable("product_category", {
	id: serial().primaryKey().notNull(),
	category: text().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	unique("product_category_category_unique").on(table.category),
]);

export const adminSession = pgTable("admin_session", {
	id: text().primaryKey().notNull(),
	adminId: uuid("admin_id").notNull(),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.adminId],
			foreignColumns: [admin.id],
			name: "admin_session_admin_id_admin_id_fk"
		}),
]);

export const studentSession = pgTable("student_session", {
	id: text().primaryKey().notNull(),
	studentId: uuid("student_id").notNull(),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.studentId],
			foreignColumns: [student.id],
			name: "student_session_student_id_student_id_fk"
		}),
]);

export const studentProfile = pgTable("student_profile", {
	id: serial().primaryKey().notNull(),
	studentId: uuid("student_id"),
	belt: text().default('White').notNull(),
	level: integer().default(1).notNull(),
	points: integer().default(0).notNull(),
	icon: text().default('),
	banner: text().default('),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.studentId],
			foreignColumns: [student.id],
			name: "student_profile_student_id_student_id_fk"
		}),
]);

export const student = pgTable("student", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	email: text().notNull(),
	userName: text("user_name").notNull(),
	passwordHash: text("password_hash").notNull(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	birthYear: integer("birth_year").notNull(),
	birthMonth: integer("birth_month").notNull(),
	birthDay: integer("birth_day").notNull(),
	center: text().notNull(),
	wristbandId: text("wristband-id").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.center],
			foreignColumns: [center.location],
			name: "student_center_center_location_fk"
		}),
	unique("student_email_unique").on(table.email),
	unique("student_user_name_unique").on(table.userName),
	unique("student_wristband-id_unique").on(table.wristbandId),
]);
