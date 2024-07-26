import { SelectUser, SessionTable, UserTable } from "@/db/schema/user";
import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"
import { db } from "@/db";


const adapter = new DrizzlePostgreSQLAdapter(db, SessionTable, UserTable)


export const lucia = new Lucia(
    adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes(databaseUserAttributes) {
        return {
            email: databaseUserAttributes.email,
            username: databaseUserAttributes.username,
            userId: databaseUserAttributes.id,
            profilePicture: databaseUserAttributes.profileUrl,

        }
    },
}
)



declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: SelectUser
    }
}
