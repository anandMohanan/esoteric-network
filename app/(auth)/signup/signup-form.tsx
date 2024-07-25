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
import { primaryfont, secondaryfont, specialfont } from "@/lib/fonts"

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
            router.push("/home")

        }
    })


    const onSubmit = async (values: SIGNUPFORMTYPE) => {
        createAccount(values)
    }
    return (
        <div className="flex items-center justify-center m-auto">
            <Card className="m-auto max-w-sm">
                <CardHeader>
                    <CardTitle className={cn("text-xl", primaryfont.className)}>Sign Up</CardTitle>
                    <CardDescription className={cn(secondaryfont.className)}>
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
                                                <FormLabel className={cn(primaryfont.className)}>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="max" {...field} className={secondaryfont.className} />
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
                                                <FormLabel className={cn(primaryfont.className)}>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="max@email.com" {...field} className={secondaryfont.className} />
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
                                                    <Input type="password" placeholder="*********" {...field} className={secondaryfont.className} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button className={primaryfont.className} type="submit" disabled={createAccountPending}>{createAccountPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}Create Account</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className={cn(specialfont.className, "text-xl")}>
                    Already have an account? <Link href="/signin" className={cn(buttonVariants({ variant: "link" }))}>Sign in</Link>
                </CardFooter>
            </Card>
        </div>
    )


}
