"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { primaryfont, secondaryfont } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { YoutubeIcon } from "lucide-react"
import React from "react"

export const YoutubeComponent = ({ editor }) => {
    const [open, setOpen] = React.useState(false)
    const [url, setUrl] = React.useState('')
    if (!editor) return null
    const addYoutubeVideo = () => {
        if (url) {
            editor.commands.setYoutubeVideo({
                src: url,
                width: Math.max(320, parseInt("480", 10)) || 640,
                height: Math.max(180, parseInt("480", 10)) || 480,
            })
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild className={primaryfont.className}>
                <Button variant="ghost" size={"icon"}> <YoutubeIcon className="h-4" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" >
                <DialogHeader className={primaryfont.className}>
                    <DialogTitle>Paste youtube link</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className={cn("sr-only", primaryfont.className)} >
                            Link
                        </Label>
                        <Input
                            className={secondaryfont.className}
                            id="link"
                            onChange={e => setUrl(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={() => {
                        addYoutubeVideo();
                        setOpen(false);

                    }}
                        className={primaryfont.className}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
