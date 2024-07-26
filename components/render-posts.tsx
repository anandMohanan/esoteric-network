import { Section } from "@/components/dividers"
import { primaryfont, secondaryfont } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import Link from "next/link"

export const RenderPosts = ({ postTitle, postId, postCreated }
    : { postTitle: string, postId: string, postCreated: string }) => {
    return (
        <Section className="flex flex-row align-middle justify-between w-full">
            <Link
                href={`/post/${postId}`}
                className={cn("scroll-m-20 text-lg underline font-semibold tracking-tight", primaryfont.className)}>
                {postTitle}
            </Link>
            <p className={cn("text-gray-500", secondaryfont.className)}>
                {postCreated}
            </p>
        </Section>
    )
}
