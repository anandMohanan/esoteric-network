import { Container, Section } from "@/components/dividers"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { db } from "@/db"
import { UserTable } from "@/db/schema/user"
import { eq } from "drizzle-orm"

interface Props {
    params: {
        slugId: string
    }
}

export default async function Profile({ params }: Props) {
    const { slugId } = params
    const user = await db.select({ username: UserTable.username }).from(UserTable).where(eq(UserTable.id, slugId!))
    return (
        <Section className="space-y-2">
            <Container >
                <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold">Meadow Richardson</h1>
                    <Button size="sm">Change photo</Button>
                </div>
            </Container>
        </Section>
    )
}
