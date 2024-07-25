interface PostPageProps {
    params: {
        postId: string
    }
}
import { db } from "@/db"
import { PostTable } from "@/db/schema/post";
import { eq } from "drizzle-orm";
import { PostContent } from "./post-content";

export default async function PostPage({ params }: PostPageProps) {
    const { postId } = params
    const postData = await db.select().from(PostTable).where(eq(PostTable.id, postId))
    const content = JSON.parse(postData[0].content)

    return (
        <div>
            <h1 className="text-center underline decoration-wavy scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {postData[0].title}
            </h1>
            <PostContent content={content} />
        </div>
    )
}
