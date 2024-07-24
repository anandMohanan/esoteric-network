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


export function NavigationMenuComponent() {
    return (
        <NavigationMenu className="w-full p-6 ">
            <NavigationMenuList className="flex min-w-full justify-between">
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Horizon</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
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
                                <p className="text-sm  text-muted-foreground">
                                    Horizon is a platform for sharing esoteric thoughts, ideas,
                                    and writings. It is a place where you can connect with
                                    others who share your interests and passions. Whether you are a seasoned esoteric enthusiast or a newcomer to the world of esoteric thought, Horizon is the perfect place
                                </p>
                            </ListItem>
                            <ListItem title="Created By" >
                                <p className="text-sm  text-muted-foreground">
                                    Niemand
                                </p>
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/signin" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Sign In
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
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

