import { Container, Main } from "@/components/dividers";
import { db } from "@/db";
import { PostTable } from "@/db/schema/post";
import { primaryfont, specialfont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { validateUser } from "@/lib/validateuser";
import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { YourPosts } from "../profile/[slugId]/your-posts";
import { UserTable } from "@/db/schema/user";
import { eq } from "drizzle-orm";
import { RenderPosts } from "@/components/render-posts";
import { Metadata } from "next";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

export const metadata: Metadata = {
    title: "Horizon",
    description: "Horizon is a digital frontier for explorers of the esoteric and extraordinary. Created as a haven for unconventional thinkers, we offer a platform where visionaries, philosophers, and artists converge to share their unique perspectives.",
    metadataBase: new URL("https://horizon.vercel.app"),
    twitter: {
        card: "summary_large_image",
    },
    openGraph: {
        title: "Horizon",
        description: "Post writings, art, and philosophies. Connect, comment, and support fellow seekers on their spiritual journeys.",
        url: "https://horizon.vercel.app",
        siteName: "Horizon",
        images: [
            "https://utfs.io/f/251a43ed-c221-45a0-94a4-2ef0491cc040-b0fwsy.png"
        ],
        type: "website",
    },
    applicationName: "Horizon",
    referrer: "origin-when-cross-origin",
    keywords: ["horizon", "esoteric", "writing", "art", "philosophy", "spirituality", "mysticism", "philosopher", "writer", "artist", "poet", "philosophies", "esotericism", "mysticism", "spiritual", "writings", "art", "poem"]
};

export default async function HomePage() {
    const user = validateUser()
    if (!user) {
        redirect("/signin")
    }
    const latestPosts = await db.select().from(PostTable)
        .orderBy(desc(PostTable.createdAt))

    return (
        <Main>
            <Container className="flex flex-col md:flex-row items-center justify-between align-middle">
                <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center", primaryfont.className)}>
                    <Balancer>
                        Latest Posts
                    </Balancer>
                </h1>
                <Link href="/create" className={cn("not-prose text-2xl mb-6 flex w-fit", buttonVariants({ variant: "outline" }), specialfont.className)}>
                    Create your own post
                </Link>
            </Container>
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
