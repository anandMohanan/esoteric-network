import { Main } from "@/components/dividers";
import { primaryfont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { validateUser } from "@/lib/validateuser";
import { redirect } from "next/navigation";
import { EditorComponent } from "./editor";
import { Metadata } from "next";
import { db } from "@/db";
import { PostTable } from "@/db/schema/post";
import { eq } from "drizzle-orm";

export const metadata: Metadata = {
    title: "Esoteric Network",
    description: "Edit Esoteric Network Post",
    metadataBase: new URL("https://www.esotericnetwork.site/"),
    twitter: {
        card: "summary_large_image",
    },
    openGraph: {
        title: "Esoteric Network",
        description: "About Esoteric Network",
        url: "https://www.esotericnetwork.site/",
        siteName: "Esoteric Network",
        images: [
            "https://utfs.io/f/251a43ed-c221-45a0-94a4-2ef0491cc040-b0fwsy.png"
        ],
        type: "website",
    },
    applicationName: "Esoteric Network",
    referrer: "origin-when-cross-origin",
    keywords: ["horizon", "esoteric", "writing", "art", "philosophy", "spirituality", "mysticism", "philosopher", "writer", "artist", "poet", "philosophies", "esotericism", "mysticism", "spiritual", "writings", "art", "poem"]
};


interface Props {
    params: {
        postId: string
    }
}
export default async function EditPage({ params }: Props) {
    const postId = params.postId
    const postData = await db.select().from(PostTable).where(eq(PostTable.id, postId))
    const user = validateUser()
    if (!user) {
        redirect("/signin")
    }
    return (
        <Main>
            <EditorComponent postData={postData[0]} />
        </Main>
    )
}
