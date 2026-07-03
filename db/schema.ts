import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const brandProfiles = pgTable(
  "brand_profile",
  {
    id: text("id")
      .$defaultFn(() => crypto.randomUUID())
      .primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    language: text("language").notNull(),
    tone: text("tone").notNull(),
    style: text("style").notNull(),
    avoid: text("avoid").notNull(),
    preferredCta: text("preferred_cta").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [uniqueIndex("brand_profile_user_id_idx").on(table.userId)],
);

export const userWorkspaceOptions = pgTable(
  "user_workspace_options",
  {
    id: text("id")
      .$defaultFn(() => crypto.randomUUID())
      .primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    languages: jsonb("languages").$type<string[]>().default([]).notNull(),
    categories: jsonb("categories").$type<string[]>().default([]).notNull(),
    tones: jsonb("tones").$type<string[]>().default([]).notNull(),
    styles: jsonb("styles").$type<string[]>().default([]).notNull(),
    avoids: jsonb("avoids").$type<string[]>().default([]).notNull(),
    ctas: jsonb("ctas").$type<string[]>().default([]).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [uniqueIndex("user_workspace_options_user_id_idx").on(table.userId)],
);

export const generations = pgTable(
  "generation",
  {
    id: text("id")
      .$defaultFn(() => crypto.randomUUID())
      .primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    brandProfileId: text("brand_profile_id").references(() => brandProfiles.id, {
      onDelete: "set null",
    }),
    tool: text("tool").notNull(),
    input: jsonb("input").$type<Record<string, unknown>>().notNull(),
    output: jsonb("output").$type<Record<string, unknown>>().notNull(),
    tone: text("tone").notNull(),
    language: text("language").notNull(),
    model: text("model").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("generation_user_id_idx").on(table.userId),
    index("generation_tool_idx").on(table.tool),
  ],
);

export const generationVersions = pgTable(
  "generation_version",
  {
    id: text("id")
      .$defaultFn(() => crypto.randomUUID())
      .primaryKey(),
    generationId: text("generation_id")
      .notNull()
      .references(() => generations.id, { onDelete: "cascade" }),
    versionNumber: integer("version_number").notNull(),
    input: jsonb("input").$type<Record<string, unknown>>().notNull(),
    output: jsonb("output").$type<Record<string, unknown>>().notNull(),
    model: text("model").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("generation_version_generation_id_idx").on(table.generationId)],
);

export type PromptTemplateFields = {
  description?: string;
  items: string[];
};

export const promptTemplates = pgTable(
  "prompt_template",
  {
    id: text("id")
      .$defaultFn(() => crypto.randomUUID())
      .primaryKey(),
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    category: text("category").notNull(),
    fields: jsonb("fields").$type<PromptTemplateFields>().notNull(),
    isBuiltIn: boolean("is_built_in").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("prompt_template_slug_idx").on(table.slug),
    index("prompt_template_user_id_idx").on(table.userId),
  ],
);

export const userRelations = relations(user, ({ many, one }) => ({
  sessions: many(session),
  accounts: many(account),
  brandProfiles: many(brandProfiles),
  generations: many(generations),
  promptTemplates: many(promptTemplates),
  workspaceOptions: one(userWorkspaceOptions),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const brandProfileRelations = relations(brandProfiles, ({ one, many }) => ({
  user: one(user, {
    fields: [brandProfiles.userId],
    references: [user.id],
  }),
  generations: many(generations),
}));

export const userWorkspaceOptionsRelations = relations(
  userWorkspaceOptions,
  ({ one }) => ({
    user: one(user, {
      fields: [userWorkspaceOptions.userId],
      references: [user.id],
    }),
  }),
);

export const generationRelations = relations(generations, ({ one, many }) => ({
  user: one(user, {
    fields: [generations.userId],
    references: [user.id],
  }),
  brandProfile: one(brandProfiles, {
    fields: [generations.brandProfileId],
    references: [brandProfiles.id],
  }),
  versions: many(generationVersions),
}));

export const generationVersionRelations = relations(
  generationVersions,
  ({ one }) => ({
    generation: one(generations, {
      fields: [generationVersions.generationId],
      references: [generations.id],
    }),
  }),
);

export const promptTemplateRelations = relations(promptTemplates, ({ one }) => ({
  user: one(user, {
    fields: [promptTemplates.userId],
    references: [user.id],
  }),
}));
