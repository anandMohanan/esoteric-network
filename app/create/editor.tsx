"use client"

import { Section } from "@/components/dividers"
import { MinimalTiptapEditor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { primaryfont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { CreatePostAction } from "@/server/actions/post";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const EditorComponent = () => {
    const [value, setValue] = useState<string>();
    const [title, setTitle] = useState("");
    const { toast } = useToast()
    console.log(value)
    const router = useRouter()
    const { mutateAsync: INTERNAL__createPost, isPending } = useMutation({
        mutationFn: async () => {
            const content = JSON.stringify(value)
            const postId = await CreatePostAction({ title, content: content })
            return postId
        },
        onSuccess(data, variables, context) {
            toast({
                title: "Post created",
                description: "Your post has been created",
                variant: "default",
            });
            router.push(`/post/${data}`)
        },
        onError(error, variables, context) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        }
    })
    return (
        <Section className=" mx-auto">
            <div className="md:w-[1000px] mx-auto">
                <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Start writing:
                </h2>
                <blockquote className="m-6  border-l-2 pl-6 italic">
                    Type / to change text styles, add images, and more.
                </blockquote>
            </div>
            <div className="flex flex-col p-8 w-[80%] mx-auto gap-6">
                <Label>Title</Label>
                <Input placeholder="Title of your Post
                " onChange={(e) => setTitle(e.target.value)} className="text-xl h-[60px]" />
                <Label>Content</Label>
                <MinimalTiptapEditor
                    value={value}
                    onValueChange={setValue}
                    outputValue="json"
                    disabled={false}
                    contentClass={cn(" mt-8", primaryfont.className)}
                />

                <Button onClick={() => INTERNAL__createPost()} className="w-full" disabled={isPending}>
                    {isPending && <Loader2 className="animate-spin" />}
                    Create Post
                </Button>
            </div>
        </Section>
    )
}
