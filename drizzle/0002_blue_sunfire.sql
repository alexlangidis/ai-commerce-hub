CREATE TABLE "user_workspace_options" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"languages" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"categories" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"tones" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"styles" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"avoids" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"ctas" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_workspace_options" ADD CONSTRAINT "user_workspace_options_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "user_workspace_options_user_id_idx" ON "user_workspace_options" USING btree ("user_id");