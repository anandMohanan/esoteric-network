import { Container, Section } from "@/components/dividers"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { db } from "@/db"
import { UserTable } from "@/db/schema/user"
import { eq } from "drizzle-orm"
import { EditProfile } from "./edit-profile"
import { PostTable } from "@/db/schema/post"
import { RenderPosts } from "@/components/render-posts"
import { validateUser } from "@/lib/validateuser"
import { Trash2 } from "lucide-react"
import { DeletePost } from "./delete-post"
import { cn } from "@/lib/utils"
import { primaryfont, secondaryfont } from "@/lib/fonts"

interface Props {
    params: {
        slugId: string
    }
}

export default async function Profile({ params }: Props) {
    const { user: validatedUser } = await validateUser()
    const { slugId } = params
    const user = await db
        .select({ userId: UserTable.id, username: UserTable.username, profileUrl: UserTable.profileUrl, bio: UserTable.bio })
        .from(UserTable).where(eq(UserTable.id, slugId!))
    const userPosts = await db
        .select({ title: PostTable.title, id: PostTable.id, createdAt: PostTable.createdAt })
        .from(PostTable).where(eq(PostTable.userId, slugId!))
    return (
        <Section className="space-y-2">
            <Container className="flex justify-between align-bottom" >
                <div className="flex flex-col gap-6 ">
                    <Avatar
                        className="size-20 cursor-pointer ring-offset-2 ring-2 ring-slate-200"
                    >
                        <AvatarImage src={user[0]?.profileUrl ?? ""} alt={user[0].username} />
                        <AvatarFallback>{user[0].username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h1 className={cn("text-2xl font-bold", primaryfont.className)}>{user[0].username}</h1>
                    </div>
                </div>
                {validatedUser?.id == user[0].userId && <EditProfile user={user[0]} />}
            </Container>
            <Container>
                <h2 className="text-xl font-bold">Bio</h2>
                <p className={cn("text-gray-500", secondaryfont.className)}>
                    {user[0].bio ?? "No bio available, Click edit to add one"}
                </p>
            </Container>
            <Container>
                <h2 className="text-xl font-bold">{validatedUser?.id === slugId! ? "Your posts" : "Posts"}</h2>
                {userPosts.length > 0 &&
                    userPosts.map((post, index) => {
                        return (
                            <>
                                <RenderPosts key={index} postTitle={post.title}
                                    postId={post.id}
                                    postCreated={post.createdAt?.toISOString().split("T")[0]!}
                                />
                                {validatedUser?.id == slugId! && <DeletePost postId={post.id} />}
                            </>
                        )
                    })
                }
                {userPosts.length === 0 && <p className={cn("text-gray-500", secondaryfont.className)}>No posts yet</p>}
            </Container>
        </Section>
    )
}
