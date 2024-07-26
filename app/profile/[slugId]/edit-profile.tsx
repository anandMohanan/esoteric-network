"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EditImage } from "./edit-image"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { UpdateUserAction } from "@/server/actions/user"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useSession } from "@/lib/providers/session"
import { User } from "lucia"
import { useMediaQuery } from "@/lib/hooks/use-media-query"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

interface EditProfileProps {
    user: { username: string; profileUrl: string | null; bio: string | null; userId: string },
    validatedUser: User | null
}

const formSchema = z.object({
    username: z.string().min(2).max(50),
    bio: z.string().min(2).max(140),

})

export const EditProfile = ({ user, validatedUser }: EditProfileProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: user.username,
            bio: user.bio ?? "",
        },
    })
    const [open, setOpen] = useState(false)
    const { toast } = useToast()
    const { mutateAsync: updateUser, isPending: updateUserPending } = useMutation({
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            await UpdateUserAction({ username: values.username, bio: values.bio })
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            })
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "User updated successfully",
                variant: "default",
            })
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        await updateUser(values)
        setOpen(false)
    }
    if (validatedUser?.id as string == user.userId) {
        if (isDesktop) {
            return (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you are done.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                                <div className="grid gap-4 py-4">
                                    <EditImage userName={user.username} profileUrl={user.profileUrl} />
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                                <FormLabel htmlFor="username" className="text-right">
                                                    Username
                                                </FormLabel>
                                                <FormControl>
                                                    <Input id="Username"
                                                        {...field}
                                                        className="col-span-3" placeholder="Enter your username" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                                <FormLabel htmlFor="bio" className="text-right">
                                                    Bio
                                                </FormLabel>
                                                <FormControl>
                                                    <Input id="bio"
                                                        {...field}
                                                        className="col-span-3" placeholder="Enter your bio" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={updateUserPending}>
                                        {updateUserPending && <Loader2 className="mr-2 animate-spin" />}
                                        Save changes
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog >
            )
        } else {
            return (
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="outline">Edit Profile</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Edit profile</DrawerTitle>
                            <DrawerDescription>
                                Make changes to your profile here. Click save when you are done.
                            </DrawerDescription>
                        </DrawerHeader>
                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                                <div className="grid gap-4 py-4">
                                    <EditImage userName={user.username} profileUrl={user.profileUrl} />
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                                <FormLabel htmlFor="username" className="text-right">
                                                    Username
                                                </FormLabel>
                                                <FormControl>
                                                    <Input id="Username"
                                                        {...field}
                                                        className="col-span-3" placeholder="Enter your username" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                                <FormLabel htmlFor="bio" className="text-right">
                                                    Bio
                                                </FormLabel>
                                                <FormControl>
                                                    <Input id="bio"
                                                        {...field}
                                                        className="col-span-3" placeholder="Enter your bio" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <DrawerFooter>
                                    <Button type="submit" disabled={updateUserPending}>
                                        {updateUserPending && <Loader2 className="mr-2 animate-spin" />}
                                        Save changes
                                    </Button>
                                </DrawerFooter>
                            </form>
                        </Form>
                    </DrawerContent>
                </Drawer>

            )

        }
    } else { return <>amog</> }
}
