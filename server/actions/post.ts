"use server"

import { db } from "@/db";
import { PostTable } from "@/db/schema/post";
import { validateUser } from "@/lib/validateuser";

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
