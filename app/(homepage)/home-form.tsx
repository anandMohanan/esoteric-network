"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { primaryfont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { SendWaitlistEmailAction } from "@/server/actions/waitlist";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
});

export const HomeForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });
    const { toast } = useToast()
    const { mutateAsync: INTERNAL__sendWaitlistEmail, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            await SendWaitlistEmailAction(values.email);
        },
        onSuccess: () => {
            form.reset();
            return toast({
                title: "Email sent",
                description: "We'll be in touch soon",
                variant: "default",
            });

        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        INTERNAL__sendWaitlistEmail(values);
    }

    return (
        <Form {...form} >
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("mt-6 space-y-2 text-left ", primaryfont.className)}
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    className="md:w-96"
                                    placeholder="Enter your email address"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit" disabled={isPending}>
                    {isPending && <Loader2 className="animate-spin" />}
                    Join the waitlist
                </Button>
            </form>
        </Form>

    );
}
