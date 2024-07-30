import { Main } from "@/components/dividers";
import { primaryfont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { validateUser } from "@/lib/validateuser";
import { redirect } from "next/navigation";
import { EditorComponent } from "./editor";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Esoteric Network",
    description: "Create Esoteric Network Post",
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

export default function CreatePage() {
    const user = validateUser()
    if (!user) {
        redirect("/signin")
    }
    return (
        <Main>
            <EditorComponent />
        </Main>
    )
}
