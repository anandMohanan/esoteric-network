import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/dividers";
import { QueryProvider } from "@/lib/providers/query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { NavigationMenuComponent } from "@/components/nav-bar";
import { SessionProvider } from "@/lib/providers/session";
import { validateUser } from "@/lib/validateuser";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
    title: "Horizon",
    description: "Post writings, art, and philosophies. Connect, comment, and support fellow seekers on their spiritual journeys.",
    metadataBase: new URL("https://horizon.vercel.app"),
    twitter: {
        card: "summary_large_image",
    },
    openGraph: {
        title: "Horizon",
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

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await validateUser()
    return (
        <Layout>
            <body className={inter.className}>
                <SessionProvider value={session}>
                    <QueryProvider>
                        <NavigationMenuComponent />
                        {children}
                    </QueryProvider>
                    <Toaster />
                    <SonnerToaster />
                </SessionProvider>
            </body>
        </Layout>
    );
}
