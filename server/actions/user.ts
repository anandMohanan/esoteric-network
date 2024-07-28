"use server"

import { db } from "@/db";
import { UserTable } from "@/db/schema/user";
import { lucia } from "@/lib/lucia";
import { zodIssuesFormatter } from "@/lib/utils";
import { SIGNUPFORMTYPE, SIGNINFORMTYPE, SIGNINSCHEMA, SIGNUPSCHEMA } from "@/lib/types/user";
import { hash, verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { validateUser } from "@/lib/validateuser";
import { revalidatePath } from "next/cache";

export const SignupUserAction = async ({ formData }: { formData: SIGNUPFORMTYPE }) => {
    let redirectPath: string | null = null
    try {
        const { userName, email, password } = SIGNUPSCHEMA.parse(formData);
        const hashedPassword = await hash(password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        })
        const hasUserName = await db.select().from(UserTable).where(eq(UserTable.username, userName));
        if (hasUserName.length > 0) {
            throw new Error("Username already exists");
        }
        const hasEmail = await db.select().from(UserTable).where(eq(UserTable.email, email));
        if (hasEmail.length > 0) {
            throw new Error("Email already exists");
        }
        const userId = await db.insert(UserTable).values({
            username: userName,
            email: email,
            password: hashedPassword
        }).returning({ userId: UserTable.id });
        const session = await lucia.createSession(userId[0].userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        redirectPath = "/home"
    } catch (e) {
        if (e instanceof z.ZodError) {
            throw new Error(zodIssuesFormatter(e.issues));
        } else {
            throw new Error(e.message)
        }
    } finally {
        if (redirectPath) {
            redirect(redirectPath)
        }
    }
};


export const SigninUserAction = async ({ formData }: { formData: SIGNINFORMTYPE }) => {
    let redirectPath: string | null = null
    try {
        const { email, password } = SIGNINSCHEMA.parse(formData);
        const existingUser = await db.select().from(UserTable).where(eq(UserTable.email, email));
        if (existingUser.length === 0) {
            throw new Error("User not found");
        }
        const validPassword = await verify(existingUser[0].password, password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });
        if (!validPassword) {
            throw new Error("Wrong password");
        }
        const session = await lucia.createSession(existingUser[0].id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        redirectPath = "/polls"
    } catch (e) {
        if (e instanceof z.ZodError) {
            throw new Error(zodIssuesFormatter(e.issues));
        } else {
            throw new Error(e.message)
        }
    } finally {
        if (redirectPath) {
            redirect(redirectPath)
        }
    }
};


export const SignoutUserAction = async () => {
    try {
        const { session } = await validateUser()
        await lucia.invalidateSession(session?.id!)
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    } catch (e) {
        throw new Error(e.message)
    }
    finally {
        redirect("/")
    }
};


export const UpdateUserImageAction = async ({ image }: { image: string }) => {
    try {
        const { user } = await validateUser()
        await db.update(UserTable).set({ profileUrl: image }).where(eq(UserTable.id, user?.id))
        revalidatePath(`/profile/${user?.id}`)
    } catch (e) {
        throw new Error(e.message)
    }
}


export const UpdateUserAction = async ({ username, bio }: { username: string, bio: string }) => {
    try {
        const { user } = await validateUser()
        const userAlreadyExists = await db.select().from(UserTable).where(eq(UserTable.username, user))
        if (userAlreadyExists.length > 0) {
            throw new Error("Username already exists");
        }
        await db.update(UserTable).set({ bio, username }).where(eq(UserTable.id, user?.id))
        revalidatePath(`/profile/${user?.id}`)
    } catch (e) {
        throw new Error(e.message)
    }
}
