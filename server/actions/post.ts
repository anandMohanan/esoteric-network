"use server"

import { db } from "@/db";
import { PostTable } from "@/db/schema/post";
import { validateUser } from "@/lib/validateuser";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const CreatePostAction = async ({ title, content }: { title: string, content: string }) => {
    try {
        const { user } = await validateUser()
        const postId = await db.insert(PostTable).values({
            title: title,
            content: content,
            userId: user?.id
        }).returning({ postId: PostTable.id });
        return postId[0].postId
    } catch (e) {
        throw new Error(e.message)
    }
}

export const DeletePostAction = async ({ postId }: { postId: string }) => {
    try {
        const { user } = await validateUser()
        const post = await db.select({ userId: PostTable.userId }).from(PostTable).where(eq(PostTable.id, postId))
        if (post[0].userId !== user?.id) {
            throw new Error("You are not authorized to delete this post")
        }
        if (post[0] === undefined) {
            throw new Error("Post not found")
        }
        await db.delete(PostTable).where(eq(PostTable.id, postId))
        revalidatePath("/profile/" + user?.id)
        revalidatePath("/home")
    } catch (e) {
        throw new Error(e.message)
    }
}
