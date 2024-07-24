"use client"

import { SIGNUPFORMTYPE, SIGNUPSCHEMA } from "@/lib/types/user"
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
import { SignupUserAction } from "@/server/actions/user"
import { useRouter } from "next/navigation"

export const SignupForm = () => {
    const form = useForm<SIGNUPFORMTYPE>({
        resolver: zodResolver(SIGNUPSCHEMA),
        defaultValues: {
            userName: "",
            email: "",
            password: ""
        }
    })
    const { toast } = useToast()
    const router = useRouter()
    const { mutate: createAccount, isPending: createAccountPending } = useMutation({
        mutationFn: async (values: SIGNUPFORMTYPE) => {
            await SignupUserAction({ formData: values })

        },
        onError: (error, variables, context) => {
            toast({
                title: error.message,
                description: "Please try again.",
                variant: "destructive",
            })

        },
        onSuccess: () => {

            toast({
                title: "Account created",
                description: "We've created your account for you.",
                variant: "default",
            })
            router.push("/")
            
        }
    })


    const onSubmit = async (values: SIGNUPFORMTYPE) => {
        createAccount(values)
    }
    return (
        <div className="flex items-center justify-center h-screen">
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
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="userName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="max" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
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
                                <Button type="submit" disabled={createAccountPending}>{createAccountPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}Create Account</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    Already have an account? <Link href="/signin" className={cn(buttonVariants({ variant: "link" }))}>Sign in</Link>
                </CardFooter>
            </Card>
        </div>
    )


}
