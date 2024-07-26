"use client"

import { Section } from "@/components/dividers";
import { MinimalTiptapEditor } from "@/components/editor";
import React from "react";


export const PostContent = ({ content }: { content: string }) => {
    return (
        <Section className="md:w-[800px] w-full flex items-center mx-auto border-none">
            <MinimalTiptapEditor
                onValueChange={() => { }}
                outputValue="json"
                contentClass="mx-auto border-none "
                disabled={true}
                initialContent={content}
            />
        </Section>
    )
}
