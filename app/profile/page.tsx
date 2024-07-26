import { validateUser } from "@/lib/validateuser"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
    const { user: validatedUser } = await validateUser()
    if (!validatedUser) {
        redirect("/signin")
    } else {
        redirect(`/profile/${validatedUser.id}`)
    }
}
