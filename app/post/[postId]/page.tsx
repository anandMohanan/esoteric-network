interface PostPageProps {
    params: {
        postId: string
    }
}
import { db } from "@/db"
import { LikeTable, PostTable } from "@/db/schema/post";
import { and, count, eq } from "drizzle-orm";
import { PostContent } from "./post-content";
import { UserTable } from "@/db/schema/user";
import { Container, Section } from "@/components/dividers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { primaryfont, secondaryfont } from "@/lib/fonts";
import { Metadata } from "next";
import { validateUser } from "@/lib/validateuser";

export async function generateMetadata({ params }: PostPageProps) {
    const postData = await db.select().from(PostTable).where(eq(PostTable.id, params.postId))
    return {
        title: postData[0].title,
        metadataBase: new URL("https://horizon.vercel.app"),
        twitter: {
            card: "summary_large_image",
        },
        openGraph: {
            title: postData[0].title,
            url: `https://horizon.vercel.app/post/${postData[0].id}`,
            siteName: "Horizon",
            images: [
                "https://utfs.io/f/251a43ed-c221-45a0-94a4-2ef0491cc040-b0fwsy.png"
            ],
            type: "website",
        },
        applicationName: "Horizon",
        referrer: "origin-when-cross-origin",
        keywords: ["horizon", "esoteric", "writing", "art", "philosophy", "spirituality", "mysticism", "philosopher", "writer", "artist", "poet", "philosophies", "esotericism", "mysticism", "spiritual", "writings", "art", "poem"]
    }
};

export default async function PostPage({ params }: PostPageProps) {
    const { postId } = params
    const { user: validatedUser } = await validateUser()
    const postData = await db.select().from(PostTable).where(eq(PostTable.id, postId))
    const content = JSON.parse(postData[0].content)
    const user = await db.select({ userId: UserTable.id, username: UserTable.username, profileUrl: UserTable.profileUrl })
        .from(UserTable).where(eq(UserTable.id, postData[0].userId))

    const likeCount = await db.select({ count: count() })
        .from(LikeTable)
        .where(and(eq(LikeTable.postId, postId), eq(LikeTable.isLiked, true)))
    const isLiked = await db.select({ isLiked: LikeTable.isLiked })
        .from(LikeTable)
        .where(and(eq(LikeTable.postId, postId), eq(LikeTable.userId, validatedUser?.id!)))
    if (isLiked[0] === undefined) {
        isLiked[0] = { isLiked: false }
    }
    return (
        <Section>

            <Container className="md:flex md:justify-between gap-2 flex flex-col md:flex-row items-center align-bottom">
                <div className="md:flex flex-col flex gap-6 items-center md:items-start ">
                    <h1 className={cn("text-center underline decoration-wavy scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", primaryfont.className)}>
                        {postData[0].title}
                    </h1>
                    <p className={cn("mt-2 text-gray-500", secondaryfont.className)}>
                        {postData[0].createdAt?.toISOString().split("T")[0]!}
                    </p>
                </div>
                <div className="md:flex md:flex-col flex flex-row items-center align-middle md:gap-0 gap-4">
                    <Avatar>
                        <AvatarImage src={user[0]?.profileUrl ?? ""} alt={user[0].username} />
                        <AvatarFallback>
                            {user[0].username[0]}
                        </AvatarFallback>
                    </Avatar>
                    <Link href={"/profile/" + user[0].userId} className="md:mt-8 mt-0 scroll-m-20 font-semibold tracking-tight">
                        {user[0].username}
                    </Link>
                </div>
            </Container>
            <PostContent content={content} likeCount={likeCount[0].count} postId={postId} isLiked={isLiked[0].isLiked} />
        </Section>
    )
}
