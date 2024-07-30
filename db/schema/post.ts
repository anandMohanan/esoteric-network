import { createId } from "@paralleldrive/cuid2";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { UserTable } from "./user";

export const PostTable = pgTable("post", {
    id: text("id").notNull().primaryKey().$defaultFn(() => createId()),
    title: text("title").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date"
    }).defaultNow(),
    updatedAt: timestamp("updated_at", {
        withTimezone: true,
        mode: "date"
    }).defaultNow(),
    userId: text("user_id").notNull().references(() => UserTable.id)
});

export const LikeTable = pgTable("like", {
    id: text("id").notNull().primaryKey().$defaultFn(() => createId()),
    postId: text("post_id").notNull().references(() => PostTable.id),
    userId: text("user_id").notNull().references(() => UserTable.id),
    isLiked: boolean("is_liked").notNull().default(true),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date"
    }).defaultNow(),
    updatedAt: timestamp("updated_at", {
        withTimezone: true,
        mode: "date"
    }).defaultNow()
});
