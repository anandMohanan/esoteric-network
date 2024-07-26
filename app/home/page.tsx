import { Main } from "@/components/dividers";
import { primaryfont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { validateUser } from "@/lib/validateuser";
import { redirect } from "next/navigation";

export default function HomePage() {
    const user = validateUser()
    if (!user) {
        redirect("/signin")
    }
    return (
        <Main>
            <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center", primaryfont.className)}>
                Coming Soon
            </h1>
        </Main>
    )
}
