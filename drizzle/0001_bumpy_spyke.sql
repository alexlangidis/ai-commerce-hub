CREATE TABLE "brand_profile" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"language" text NOT NULL,
	"tone" text NOT NULL,
	"style" text NOT NULL,
	"avoid" text NOT NULL,
	"preferred_cta" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "generation_version" (
	"id" text PRIMARY KEY NOT NULL,
	"generation_id" text NOT NULL,
	"version_number" integer NOT NULL,
	"input" jsonb NOT NULL,
	"output" jsonb NOT NULL,
	"model" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "generation" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"brand_profile_id" text,
	"tool" text NOT NULL,
	"input" jsonb NOT NULL,
	"output" jsonb NOT NULL,
	"tone" text NOT NULL,
	"language" text NOT NULL,
	"model" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prompt_template" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"category" text NOT NULL,
	"fields" jsonb NOT NULL,
	"is_built_in" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "brand_profile" ADD CONSTRAINT "brand_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generation_version" ADD CONSTRAINT "generation_version_generation_id_generation_id_fk" FOREIGN KEY ("generation_id") REFERENCES "public"."generation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generation" ADD CONSTRAINT "generation_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generation" ADD CONSTRAINT "generation_brand_profile_id_brand_profile_id_fk" FOREIGN KEY ("brand_profile_id") REFERENCES "public"."brand_profile"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prompt_template" ADD CONSTRAINT "prompt_template_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "brand_profile_user_id_idx" ON "brand_profile" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "generation_version_generation_id_idx" ON "generation_version" USING btree ("generation_id");--> statement-breakpoint
CREATE INDEX "generation_user_id_idx" ON "generation" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "generation_tool_idx" ON "generation" USING btree ("tool");--> statement-breakpoint
CREATE UNIQUE INDEX "prompt_template_slug_idx" ON "prompt_template" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "prompt_template_user_id_idx" ON "prompt_template" USING btree ("user_id");