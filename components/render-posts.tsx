import { Container, Section } from "@/components/dividers"
import { db } from "@/db"
import { LikeTable } from "@/db/schema/post"
import { primaryfont, secondaryfont } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { and, count, eq } from "drizzle-orm"
import { TrendingUp } from "lucide-react"
import Link from "next/link"

export const RenderPosts = async ({ postTitle, postId, postCreated }
    : { postTitle: string, postId: string, postCreated: string }) => {
    const likeCount = await db.select({ count: count() })
        .from(LikeTable)
        .where(and(eq(LikeTable.postId, postId), eq(LikeTable.isLiked, true)))
    return (
        <Section className="flex flex-row align-middle justify-between w-full">
            <div className="flex flex-col">
                <Link
                    href={`/post/${postId}`}
                    className={cn("scroll-m-20 text-lg underline font-semibold tracking-tight", primaryfont.className)}>
                    {postTitle}
                </Link>
                <p className="leading-7 flex  gap-4 ">
                    <TrendingUp className="text-green-500" />  {likeCount[0].count}
                </p>
            </div>
            <p className={cn("text-gray-500", secondaryfont.className)}>
                {postCreated}
            </p>
        </Section>
    )
}
