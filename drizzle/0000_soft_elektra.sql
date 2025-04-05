-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "admin" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"center" text NOT NULL,
	CONSTRAINT "admin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "product_image" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" serial NOT NULL,
	"source" text NOT NULL,
	CONSTRAINT "product_image_source_unique" UNIQUE("source")
);
--> statement-breakpoint
CREATE TABLE "center" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"location" text NOT NULL,
	CONSTRAINT "center_location_unique" UNIQUE("location")
);
--> statement-breakpoint
CREATE TABLE "student_inventory" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" serial NOT NULL,
	"student_id" uuid
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"price" integer NOT NULL,
	"description" text NOT NULL,
	"category" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"center" text NOT NULL,
	"image_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "product_category_category_unique" UNIQUE("category")
);
--> statement-breakpoint
CREATE TABLE "admin_session" (
	"id" text PRIMARY KEY NOT NULL,
	"admin_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student_session" (
	"id" text PRIMARY KEY NOT NULL,
	"student_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student_profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" uuid,
	"belt" text DEFAULT 'White' NOT NULL,
	"level" integer DEFAULT 1 NOT NULL,
	"points" integer DEFAULT 0 NOT NULL,
	"icon" text DEFAULT '',
	"banner" text DEFAULT '',
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "student" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"user_name" text NOT NULL,
	"password_hash" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"birth_year" integer NOT NULL,
	"birth_month" integer NOT NULL,
	"birth_day" integer NOT NULL,
	"center" text NOT NULL,
	"wristband-id" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "student_email_unique" UNIQUE("email"),
	CONSTRAINT "student_user_name_unique" UNIQUE("user_name"),
	CONSTRAINT "student_wristband-id_unique" UNIQUE("wristband-id")
);
--> statement-breakpoint
ALTER TABLE "admin" ADD CONSTRAINT "admin_center_center_location_fk" FOREIGN KEY ("center") REFERENCES "public"."center"("location") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_inventory" ADD CONSTRAINT "student_inventory_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_inventory" ADD CONSTRAINT "student_inventory_student_id_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_category_product_category_category_fk" FOREIGN KEY ("category") REFERENCES "public"."product_category"("category") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_center_center_location_fk" FOREIGN KEY ("center") REFERENCES "public"."center"("location") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admin_session" ADD CONSTRAINT "admin_session_admin_id_admin_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."admin"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_session" ADD CONSTRAINT "student_session_student_id_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_profile" ADD CONSTRAINT "student_profile_student_id_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_center_center_location_fk" FOREIGN KEY ("center") REFERENCES "public"."center"("location") ON DELETE no action ON UPDATE no action;
*/