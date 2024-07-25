import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const UserTable = pgTable("user", {
    id: text("id").notNull().primaryKey().$defaultFn(() => createId()),
    username: text("username").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    bio: text("bio"),
    profileUrl: text("profile_url"),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date"
    }).defaultNow(),
    updatedAt: timestamp("updated_at", {
        withTimezone: true,
        mode: "date"
    }).defaultNow()
});


export type InsertUser = typeof UserTable.$inferInsert
export type SelectUser = typeof UserTable.$inferSelect


export const SessionTable = pgTable("session", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => UserTable.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
});

