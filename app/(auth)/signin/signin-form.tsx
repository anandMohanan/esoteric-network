
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
            router.push("/")
        },
    })


    const onSubmit = async (values: SIGNINFORMTYPE) => {
        signInAccount(values)
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Link
                href="/"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute left-4 top-4 md:left-8 md:top-8"
                )}
            >
                <>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                </>
            </Link>
            <Card className="m-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Sign In</CardTitle>
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
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="max@email.com" {...field} />
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
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="*********" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type="submit" disabled={signInPending} >{signInPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}Sign In</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    Don't have an account? <Link href="/signup" className={cn(buttonVariants({ variant: "link" }))}>Sign up</Link>
                </CardFooter>
            </Card>
        </div>
    )


}
