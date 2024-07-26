import { Container, Main } from "@/components/dividers";
import { db } from "@/db";
import { PostTable } from "@/db/schema/post";
import { primaryfont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { validateUser } from "@/lib/validateuser";
import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { YourPosts } from "../profile/[slugId]/your-posts";
import { UserTable } from "@/db/schema/user";
import { eq } from "drizzle-orm";
import { RenderPosts } from "@/components/render-posts";

export default async function HomePage() {
    const user = validateUser()
    if (!user) {
        redirect("/signin")
    }
    const latestPosts = await db.select().from(PostTable)
        .orderBy(desc(PostTable.createdAt))

    return (
        <Main>
            <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center", primaryfont.className)}>
                Latest Posts
            </h1>
            <Container>
                {
                    latestPosts.map((post, index) => {
                        return <RenderPosts key={index} postTitle={post.title}
                            postId={post.id}
                            postCreated={post.createdAt?.toISOString().split("T")[0]!}
                        />
                    })

                }
            </Container>
        </Main>
    )
}
