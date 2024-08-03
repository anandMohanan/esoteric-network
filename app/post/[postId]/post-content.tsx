"use client"

import { Container, Section } from "@/components/dividers";
import { MinimalTiptapEditor } from "@/components/editor";
import { Button, buttonVariants } from "@/components/ui/button";
import { primaryfont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, Heart, Loader, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { LikeComponent } from "./like-compontent";
import { useMutation } from "@tanstack/react-query";
import { ModifyLikeAction } from "@/server/actions/post";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

interface PostContentProps {
    content: string
    likeCount: number
    postId: string
    isLiked: boolean
    validatedUser: string | undefined
    postUserId: string
}

export const PostContent = ({ content, likeCount, postId, isLiked,
    validatedUser, postUserId
}: PostContentProps) => {
    const router = useRouter()
    const { mutateAsync: modifyLike, isPending: isModifyingLike } = useMutation({
        mutationFn: async () => {
            await ModifyLikeAction({ postId: postId })
        },
    })
    return (
        <Section>
            <Container className="flex justify-start gap-4">
                <Link href="/home" className={cn(buttonVariants({ variant: "outline" }))}>

                    <ChevronLeftIcon className="h-5 w-5" />
                </Link>
                {
                    validatedUser === postUserId &&
                    <Link href={`/edit/${postId}`} className={cn(buttonVariants({
                        variant: "outline",
                    }))}>
                        Edit
                    </Link>
                }
                <div className="flex gap-2 items-center">
                    <Button onClick={() => modifyLike()} variant={"ghost"} size={"icon"}>
                        {isModifyingLike ? <Loader2 className="h-5 w-5 animate-spin" /> :
                            <Heart className={cn(
                                isLiked ? "text-green-500" : "",
                            )} />
                        }
                    </Button>
                    {likeCount}
                </div>
            </Container>
            <Container className="md:w-[800px] w-full flex items-center mx-auto border-none">
                <MinimalTiptapEditor
                    onValueChange={() => { }}
                    outputValue="json"
                    contentClass={cn("mx-auto border-none ", primaryfont.className)}
                    disabled={true}
                    initialContent={content}
                />
            </Container>
        </Section>
    )
}
