"use server"

import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export const SendWaitlistEmailAction = async (email: string) => {
    try {
        const { data, error } = await resend.emails.send({
            to: email,
            from: 'Horizon <onboarding@resend.dev>',
            subject: "Join the waitlist",
            react: EmailTemplate()
        });
        if (error) {
            throw new Error(error.message);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}
