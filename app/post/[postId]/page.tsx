interface PostPageProps {
    params: {
        postId: string
    }
}
import { db } from "@/db"
import { PostTable } from "@/db/schema/post";
import { eq } from "drizzle-orm";
import { PostContent } from "./post-content";
import { UserTable } from "@/db/schema/user";
import { Container, Section } from "@/components/dividers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function PostPage({ params }: PostPageProps) {
    const { postId } = params
    const postData = await db.select().from(PostTable).where(eq(PostTable.id, postId))
    const content = JSON.parse(postData[0].content)
    const user = await db.select({ username: UserTable.username, profileUrl: UserTable.profileUrl })
        .from(UserTable).where(eq(UserTable.id, postData[0].userId))

    return (
        <Section>

            <Container className="flex justify-between align-bottom">
                <div className="flex flex-col gap-6 ">
                    <h1 className="text-center underline decoration-wavy scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        {postData[0].title}
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Created on <span className="underline">{postData[0].createdAt?.toISOString().split("T")[0]!}</span>
                    </p>
                </div>
                <div>
                    <Avatar>
                        <AvatarImage src={user[0].profileUrl ?? ""} alt={user[0].username} />
                        <AvatarFallback>
                            {user[0].username[0]}
                        </AvatarFallback>
                    </Avatar>
                    <p className="mt-8 scroll-m-20 font-semibold tracking-tight">
                        {user[0].username}
                    </p>
                </div>
            </Container>
            <PostContent content={content} />
        </Section>
    )
}
