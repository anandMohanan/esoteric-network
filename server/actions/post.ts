"use server"

import { db } from "@/db";
import { LikeTable, PostTable } from "@/db/schema/post";
import { validateUser } from "@/lib/validateuser";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const CreatePostAction = async ({ title, content }: { title: string, content: string }) => {
    try {
        const { user } = await validateUser()
        const postId = await db.insert(PostTable).values({
            title: title!,
            content: content!,
            userId: user?.id!
        }).returning({ postId: PostTable.id });
        revalidatePath("/home")
        return postId[0].postId
    } catch (e) {
        throw new Error(e.message)
    }
}

export const EditPostAction = async ({ title, content, postId }: { title: string, content: string, postId: string }) => {
    try {
        if (title === undefined || content === undefined) {
            throw new Error("Title and content are required")
        }
        const { user } = await validateUser()
        await db.update(PostTable).set({
            title: title!,
            content: content!,
            userId: user?.id!,
            updatedAt: new Date()
        }).where(eq(PostTable.id, postId))
        revalidatePath("/post/" + postId)
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
        await db.delete(LikeTable).where(eq(LikeTable.postId, postId));
        await db.delete(PostTable).where(eq(PostTable.id, postId))
        revalidatePath("/profile/" + user?.id)
        revalidatePath("/home")
    } catch (e) {
        throw new Error(e.message)
    }
}

export const ModifyLikeAction = async ({ postId }: { postId: string }) => {
    try {
        const { user } = await validateUser()
        const alreadyLiked =
            await db.select({ isLiked: LikeTable.isLiked }).from(LikeTable).where(eq(LikeTable.postId, postId))
        if (alreadyLiked[0] === undefined) {
            await db.insert(LikeTable).values({
                postId: postId,
                userId: user?.id!,
                isLiked: true,
                createdAt: new Date()
            })
            revalidatePath("/post/" + postId)
            return
        }
        if (alreadyLiked[0].isLiked) {
            await db.update(LikeTable).set({
                isLiked: false,
                updatedAt: new Date()
            }).where(and(eq(LikeTable.postId, postId), eq(LikeTable.userId, user?.id!)))
            revalidatePath("/post/" + postId)
            return
        }
        if (alreadyLiked[0].isLiked === false) {
            await db.update(LikeTable).set({
                isLiked: true,
                updatedAt: new Date()
            }).where(and(eq(LikeTable.postId, postId), eq(LikeTable.userId, user?.id!)))
            revalidatePath("/post/" + postId)
            return
        }
    } catch (e) {
        throw new Error(e.message)
    }
}
