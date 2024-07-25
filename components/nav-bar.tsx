"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { useSession } from "@/lib/providers/session"
import { useMutation } from "@tanstack/react-query"
import { SignoutUserAction } from "@/server/actions/user"
import { useToast } from "./ui/use-toast"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { primaryfont, secondaryfont } from "@/lib/fonts"
import { useRouter } from "next/navigation"


export function NavigationMenuComponent() {
    const session = useSession()
    const { toast } = useToast()
    const router = useRouter()
    const { mutate: logoutUser, isPending: logoutPending } = useMutation({
        mutationFn: async () => {
            await SignoutUserAction()
        },
        onError(error, variables, context) {
            toast({
                title: error.message,
                description: "Please try again.",
                variant: "destructive",
            })
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "You have been signed out.",
                variant: "default",
            })
            router.push("/")
        },
    })
    return (
        <NavigationMenu className={cn("w-full p-6  ", primaryfont.className)}>
            <NavigationMenuList className="flex min-w-full justify-between">
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Horizon</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >
                                        <Image
                                            src="/sisyphus.png"
                                            alt="Sisyphus"
                                            width={400}
                                            height={800}
                                        />
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            Horizon
                                        </div>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem title="About" href="/about">
                                <p className={cn("text-sm  text-muted-foreground", secondaryfont.className)}>
                                    Horizon is a platform for sharing esoteric thoughts, ideas,
                                    and writings. It is a place where you can connect with
                                    others who share your interests and passions. Whether you are a seasoned esoteric enthusiast or a newcomer to the world of esoteric thought, Horizon is the perfect place
                                </p>
                            </ListItem>
                            <ListItem title="Created By" className="cursor-cell" >
                                <p className={cn("text-sm  text-muted-foreground", secondaryfont.className)}>
                                    Niemand
                                </p>
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                {session.user ? (
                    <>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>{session.user.username}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <a
                                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                href={`/profile/${session.user.id}`}
                                            >
                                                <Image
                                                    src="/sisyphus.png"
                                                    alt="Sisyphus"
                                                    width={200}
                                                    height={800}
                                                />
                                                <div className="mb-2 mt-4 text-lg font-medium">
                                                    Profile
                                                </div>
                                            </a>
                                        </NavigationMenuLink>
                                    </li>
                                    <ListItem title="Create" href="/create">
                                        <p className={cn("text-sm  text-muted-foreground", secondaryfont.className)}>
                                            Create a new post
                                        </p>
                                    </ListItem>
                                    <ListItem title="View" href="/view">
                                        <p className={cn("text-sm  text-muted-foreground", secondaryfont.className)}>
                                            View your posts
                                        </p>
                                    </ListItem>
                                    <Button variant={"outline"} onClick={() => logoutUser()} disabled={logoutPending}>
                                    {logoutPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}Logout
                                    </Button>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </>
                ) : (
                    <NavigationMenuItem>
                        <Link href="/signin" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Sign In
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                )}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

