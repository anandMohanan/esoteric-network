import type { Editor } from '@tiptap/core'
import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import { secondaryfont } from '@/lib/fonts'

interface ImageEditBlockProps extends React.HTMLAttributes<HTMLDivElement> {
    editor: Editor
    close: () => void
}

const ImageEditBlock = ({ editor, className, close, ...props }: ImageEditBlockProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [link, setLink] = useState<string>('')

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        fileInputRef.current?.click()
    }

    const handleLink = () => {
        editor.chain().focus().setImage({ src: link }).run()
        close()
    }

    const { toast } = useToast()



    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        toast({
            title: "Uploading...",
            description: "Please wait while we upload your image",
            variant: "default",
        });
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    "content-type": file?.type || "application/octet-stream",
                    'x-vercel-filename': file?.name || "image.png",  // Optionally set filename in headers
                },
                body: file,
            });

            if (!response.ok) {
                toast({
                    title: "Error",
                    description: "Failed to upload file",
                    variant: "destructive",
                });
            }

            const data = await response.json();
            console.log('File uploaded successfully:', data);
            // Handle successful upload, e.g., update the editor with the image URL
            const src = data.url;  // Assuming the API response includes the image URL
            editor.chain().setImage({ src }).focus().run();
            toast({
                title: "Success",
                description: "Image uploaded successfully",
                variant: "default",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to upload file",
                variant: "destructive",
            });
        } finally {
            close();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleLink()
    }

    return (
        <form onSubmit={handleSubmit} className={secondaryfont.className}>
            <div className={cn('space-y-6', className)} {...props}>
                <div className="space-y-1">
                    <Label>Attach an image link</Label>
                    <div className="flex">
                        <Input
                            type="url"
                            required
                            placeholder="https://example.com"
                            value={link}
                            className="grow"
                            onChange={e => setLink(e.target.value)}
                        />
                        <Button type="submit" className="ml-2 inline-block">
                            Submit
                        </Button>
                    </div>
                </div>
                <Button className="w-full" onClick={handleClick}>
                    Upload from your computer
                </Button>
                <input type="file" accept="image/*" ref={fileInputRef} multiple className="hidden" onChange={handleFile} />
            </div>
        </form>
    )
}

export { ImageEditBlock }
