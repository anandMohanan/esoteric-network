import type { Editor } from '@tiptap/core'
import { useState } from 'react'
import { ImageIcon } from '@radix-ui/react-icons'
import { ToolbarButton } from '../toolbar-button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ImageEditBlock } from './image-edit-block'
import { useMediaQuery } from '@/lib/hooks/use-media-query'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { secondaryfont } from '@/lib/fonts'

const ImageEditDialog = ({ editor }: { editor: Editor }) => {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <ToolbarButton isActive={editor.isActive('image')} tooltip="Image" aria-label="Image">
                        <ImageIcon className="size-5" />
                    </ToolbarButton>
                </DialogTrigger>
                <DialogContent className={cn("sm:max-w-lg", secondaryfont.className)}>
                    <DialogHeader>
                        <DialogTitle>Select image</DialogTitle>
                    </DialogHeader>
                    <ImageEditBlock editor={editor} close={() => setOpen(false)} />
                </DialogContent>
            </Dialog>
        )
    } else {
        return <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <ToolbarButton isActive={editor.isActive('image')} tooltip="Image" aria-label="Image">
                    <ImageIcon className="size-5" />
                </ToolbarButton>
            </DrawerTrigger>
            <DrawerContent className={cn("sm:max-w-lg", secondaryfont.className)}>
                <DrawerHeader>
                    <DrawerTitle>Select image</DrawerTitle>
                    <ImageEditBlock editor={editor} close={() => setOpen(false)} />
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    }
}

export { ImageEditDialog }
