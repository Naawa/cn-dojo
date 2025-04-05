import { relations } from "drizzle-orm/relations";
import { center, admin, product, productImage, studentInventory, student, productCategory, adminSession, studentSession, studentProfile } from "./schema";

export const adminRelations = relations(admin, ({one, many}) => ({
	center: one(center, {
		fields: [admin.center],
		references: [center.location]
	}),
	adminSessions: many(adminSession),
}));

export const centerRelations = relations(center, ({many}) => ({
	admins: many(admin),
	products: many(product),
	students: many(student),
}));

export const productImageRelations = relations(productImage, ({one}) => ({
	product: one(product, {
		fields: [productImage.productId],
		references: [product.id]
	}),
}));

export const productRelations = relations(product, ({one, many}) => ({
	productImages: many(productImage),
	studentInventories: many(studentInventory),
	productCategory: one(productCategory, {
		fields: [product.category],
		references: [productCategory.category]
	}),
	center: one(center, {
		fields: [product.center],
		references: [center.location]
	}),
}));

export const studentInventoryRelations = relations(studentInventory, ({one}) => ({
	product: one(product, {
		fields: [studentInventory.productId],
		references: [product.id]
	}),
	student: one(student, {
		fields: [studentInventory.studentId],
		references: [student.id]
	}),
}));

export const studentRelations = relations(student, ({one, many}) => ({
	studentInventories: many(studentInventory),
	studentSessions: many(studentSession),
	studentProfiles: many(studentProfile),
	center: one(center, {
		fields: [student.center],
		references: [center.location]
	}),
}));

export const productCategoryRelations = relations(productCategory, ({many}) => ({
	products: many(product),
}));

export const adminSessionRelations = relations(adminSession, ({one}) => ({
	admin: one(admin, {
		fields: [adminSession.adminId],
		references: [admin.id]
	}),
}));

export const studentSessionRelations = relations(studentSession, ({one}) => ({
	student: one(student, {
		fields: [studentSession.studentId],
		references: [student.id]
	}),
}));

export const studentProfileRelations = relations(studentProfile, ({one}) => ({
	student: one(student, {
		fields: [studentProfile.studentId],
		references: [student.id]
	}),
}));