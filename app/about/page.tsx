import { Main, Section } from "@/components/dividers";
import { primaryfont, secondaryfont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
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
        description: "About Horizon",
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

export default function About() {
    return (
        <Main>
            <Section className="max-w-[800px] mx-auto">
                <h1 className={cn("scroll-m-20 underline mb-10 text-center text-4xl font-extrabold tracking-tight lg:text-5xl"
                    , primaryfont.className)}>
                    About this project:
                </h1>
                <p className={cn("max-w-[800px] mx-auto text-2xl  leading-7",
                    "text-center [&:not(:first-child)]:mt-6", secondaryfont.className)}>
                    <Balancer>
                        Horizon is a digital frontier for explorers of the
                        esoteric and extraordinary. Created as a haven
                        for unconventional thinkers, we offer a platform where
                        visionaries, philosophers, and artists
                        converge to share their unique perspectives.
                    </Balancer>
                </p>
                <blockquote className="mt-6 border-l-2 pl-6 italic">
                    We believe in the transformative power of collective wisdom
                    and the importance of bridging ancient knowledge with contemporary insights.
                </blockquote>
                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Our mission is to expand the boundaries of thought by fostering a community that celebrates diverse spiritual and philosophical expressions. At Horizon, you can:
                </h2>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>Share your esoteric writings, artwork, and reflections</li>
                    <li>Discover thought-provoking content from fellow seekers</li>
                    <li>Engage in meaningful dialogues through comments</li>
                    <li>Support creators through likes and donations</li>
                </ul>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Join us at the Horizon, where each contribution illuminates new paths of understanding.
                </p>
                <Image
                    className="mx-auto m-10"
                    src="/flower.png"
                    alt="Horizon"
                    width={600}
                    height={800}
                />
            </Section>
        </Main>
    )

}
