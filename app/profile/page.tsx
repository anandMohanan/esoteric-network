import { validateUser } from "@/lib/validateuser"
import { Metadata } from "next";
import { redirect } from "next/navigation"

export const metadata: Metadata = {
    title: "Horizon",
    description: "Unleash your inner mystic. Post writings, art, and philosophies. Connect, comment, and support fellow seekers on their spiritual journeys.",
    metadataBase: new URL("https://horizon.vercel.app"),
    twitter: {
        card: "summary_large_image",
    },
    openGraph: {
        title: "Horizon",
        description: "Unleash your inner mystic. Post writings, art, and philosophies. Connect, comment, and support fellow seekers on their spiritual journeys.",
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

export default async function ProfilePage() {
    const { user: validatedUser } = await validateUser()
    if (!validatedUser) {
        redirect("/signin")
    } else {
        redirect(`/profile/${validatedUser.id}`)
    }
}
