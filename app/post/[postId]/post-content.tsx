"use client"

import { Container, Section } from "@/components/dividers";
import { MinimalTiptapEditor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { primaryfont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";


export const PostContent = ({ content }: { content: string }) => {
    const router = useRouter()
    return (
        <Section>
            <Container>
                <Button onClick={() => router.back()} variant={"outline"}>

                    <ChevronLeftIcon className="h-5 w-5" />
                </Button>
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
