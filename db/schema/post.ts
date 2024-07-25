import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { UserTable } from "./user";

export const PostTable = pgTable("post", {
    id: text("id").notNull().primaryKey().$defaultFn(() => createId()),
    title: text("title").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date"
    }),
    updatedAt: timestamp("updated_at", {
        withTimezone: true,
        mode: "date"
    }),
    userId: text("user_id").notNull().references(() => UserTable.id)
});
