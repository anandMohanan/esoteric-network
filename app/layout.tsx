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
