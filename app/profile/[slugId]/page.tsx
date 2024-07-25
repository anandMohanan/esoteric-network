interface Props {
    params: {
        slugId: string
    }
}
import { PostTable } from "@/db/schema/post";
import { db } from "../../../db";
import { eq } from "drizzle-orm";

export default async function Profile({ params }: Props) {
    const { slugId } = params
    const post = await db.select().from(PostTable).where(eq(PostTable.userId, slugId))
    return (
        <div>
            Profile
            {JSON.stringify(post)}
        </div>
    )
}
