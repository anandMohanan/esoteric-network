import { Container, Section } from "@/components/dividers"
import Link from "next/link"

export const YourPosts = ({ postTitle, postId, postCreated }
    : { postTitle: string, postId: string, postCreated: string }) => {
    return (
        <Section className="flex flex-row justify-between w-full">
            <Link
                href={`/post/${postId}`}
                className="scroll-m-20 text-xl underline font-semibold tracking-tight">
                {postTitle}
            </Link>
            <p className="mt-2 text-gray-500">
                {postCreated}
            </p>
        </Section>
    )
}
