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
import Link from "next/link";
import { cn } from "@/lib/utils";
import { primaryfont, secondaryfont } from "@/lib/fonts";

export default async function PostPage({ params }: PostPageProps) {
    const { postId } = params
    const postData = await db.select().from(PostTable).where(eq(PostTable.id, postId))
    const content = JSON.parse(postData[0].content)
    const user = await db.select({ userId: UserTable.id, username: UserTable.username, profileUrl: UserTable.profileUrl })
        .from(UserTable).where(eq(UserTable.id, postData[0].userId))

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
                        <AvatarImage src={user[0].profileUrl ?? ""} alt={user[0].username} />
                        <AvatarFallback>
                            {user[0].username[0]}
                        </AvatarFallback>
                    </Avatar>
                    <Link href={"/profile/" + user[0].userId} className="md:mt-8 mt-0 scroll-m-20 font-semibold tracking-tight">
                        {user[0].username}
                    </Link>
                </div>
            </Container>
            <PostContent content={content} />
        </Section>
    )
}
