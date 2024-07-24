
"use client"

import { SIGNINFORMTYPE, SIGNINSCHEMA } from "@/lib/types/user"
import { ChevronLeft, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { SigninUserAction, SignupUserAction } from "@/server/actions/user"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
import { primaryfont, secondaryfont, specialfont } from "@/lib/fonts"

export const SigninForm = () => {
    const form = useForm<SIGNINFORMTYPE>({
        resolver: zodResolver(SIGNINSCHEMA),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const { toast } = useToast()
    const router = useRouter()
    const { mutate: signInAccount, isPending: signInPending } = useMutation({
        mutationFn: async (values: SIGNINFORMTYPE) => {
            await SigninUserAction({ formData: values })

        },
        onError(error, variables, context) {
            if (error.message === "User not found") {
                toast({
                    title: "User not found",
                    description: "Please try again.",
                    variant: "default",
                    action: <ToastAction altText="Sign up" onClick={() => router.push("/signup")}>Sign up</ToastAction>
                })
            } else {
                toast({
                    title: error.message,
                    description: "Please try again.",
                    variant: "destructive",
                })
            }

        },
        onSuccess: () => {
            toast({
                title: "Signed in Successfully",
                variant: "default",
            })
            router.push("/app")
        },
    })


    const onSubmit = async (values: SIGNINFORMTYPE) => {
        signInAccount(values)
    }
    return (
        <div className="flex items-center justify-center">
            <Card className="m-auto max-w-sm">
                <CardHeader>
                    <CardTitle className={cn("text-xl", primaryfont.className)}>Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={cn(primaryfont.className)}>Email</FormLabel>
                                                <FormControl>
                                                    <Input className={secondaryfont.className} placeholder="max@email.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={cn(primaryfont.className)}>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="*********"
                                                        className={secondaryfont.className}
                                                        {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button className={primaryfont.className} type="submit" disabled={signInPending} >{signInPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}Sign In</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className={cn(specialfont.className, "text-xl")}>
                    Do not have an account? <Link href="/signup" className={cn(buttonVariants({ variant: "link" }))}>Sign up</Link>
                </CardFooter>
            </Card>
        </div>
    )


}
