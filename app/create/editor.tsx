"use client"

import { Section } from "@/components/dividers"
import { MinimalTiptapEditor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { primaryfont, secondaryfont, specialfont } from "@/lib/fonts";
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
            <div className="flex flex-col p-8 w-[80%] mx-auto gap-6">
                <Input placeholder="Enter your Title"
                    onChange={(e) => setTitle(e.target.value)}
                    className={cn("text-4xl h-[60px] border-none underline outline-none focus:outline-none focus:ring-0 focus:ring-transparent", primaryfont.className)}
                />
                <Label className={cn("text-xl font-bold", secondaryfont.className)}>Content:</Label>
                <MinimalTiptapEditor
                    value={value}
                    onValueChange={setValue}
                    outputValue="json"
                    disabled={false}
                    contentClass={cn(" mt-8", primaryfont.className)}
                />

                <Button onClick={() => INTERNAL__createPost()} className={cn("w-full text-xl font-extrabold", specialfont.className)} disabled={isPending}>
                    {isPending ? <Loader2 className="animate-spin mr-2" /> : "Create Post"}
                </Button>
            </div>
        </Section>
    )
}
