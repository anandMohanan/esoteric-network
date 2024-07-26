"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { useToast } from "@/components/ui/use-toast"
import { useMediaQuery } from "@/lib/hooks/use-media-query"
import { DeletePostAction } from "@/server/actions/post"
import { useMutation } from "@tanstack/react-query"
import { Loader2, Trash2 } from "lucide-react"
import { useState } from "react"

interface DeletePostProps {
    postId: string
}

export const DeletePost = ({ postId }: DeletePostProps) => {
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const { mutateAsync: INTERNAL__deletePost, isPending: deletePostPending } = useMutation({
        mutationFn: async () => {
            await DeletePostAction({ postId })
            setOpen(false)
        },
        onSuccess(data, variables, context) {
            toast({
                title: "Post deleted",
                description: "Your post has been deleted",
                variant: "default",
            });
        },
        onError(error, variables, context) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        }
    })
    const isDesktop = useMediaQuery("(min-width: 768px)")
    if (isDesktop) {
        return <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"}><Trash2 className="w-4 h-4" /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Delete Post</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete this post?
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <Button variant={"destructive"} onClick={() => INTERNAL__deletePost()}>
                        {deletePostPending ? <Loader2 className="mr-2 animate-spin" /> : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    } else {
        return <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant={"outline"}><Trash2 className="w-4 h-4" /></Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Delete Post</DrawerTitle>
                    <DrawerDescription>
                        Are you sure you want to delete this post?
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant={"outline"}>Cancel</Button>
                    </DrawerClose>
                    <Button variant={"destructive"} onClick={() => INTERNAL__deletePost()}>
                        {deletePostPending ? <Loader2 className="mr-2 animate-spin" /> : "Delete"}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    }
}
