import { Main } from "@/components/dividers";
import { SigninForm } from "./signin-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign in",
    description: "Sign in to Esoteric network",
    metadataBase: new URL("https://www.esotericnetwork.site/"),
    twitter: {
        card: "summary_large_image",
    },
    openGraph: {
        title: "Sign in",
        description: "Sign in to Esoteric network",
        url: "https://www.esotericnetwork.site/signin",
        siteName: "Esoteric network",
        images: [
            "https://utfs.io/f/251a43ed-c221-45a0-94a4-2ef0491cc040-b0fwsy.png"
        ],
        type: "website",
    },
    applicationName: "Esoteric network",
    referrer: "origin-when-cross-origin",
    keywords: ["horizon", "esoteric", "writing", "art", "philosophy", "spirituality", "mysticism", "philosopher", "writer", "artist", "poet", "philosophies", "esotericism", "mysticism", "spiritual", "writings", "art", "poem"]
};
export default function SignIn() {
    return <Main>
        <SigninForm />
    </Main>
}
