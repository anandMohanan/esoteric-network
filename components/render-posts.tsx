import { Section } from "@/components/dividers"
import Link from "next/link"

export const RenderPosts = ({ postTitle, postId, postCreated }
    : { postTitle: string, postId: string, postCreated: string }) => {
    return (
        <Section className="flex flex-row align-middle justify-between w-full">
            <Link
                href={`/post/${postId}`}
                className="scroll-m-20 text-lg underline font-semibold tracking-tight">
                {postTitle}
            </Link>
            <p className="text-gray-500">
                {postCreated}
            </p>
        </Section>
    )
}
