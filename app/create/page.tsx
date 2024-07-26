import { Main } from "@/components/dividers";
import { primaryfont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { validateUser } from "@/lib/validateuser";
import { redirect } from "next/navigation";
import { EditorComponent } from "./editor";
import "./prosemirror.css";

export default function CreatePage() {
    const user = validateUser()
    if (!user) {
        redirect("/signin")
    }
    return (
        <Main>
            <EditorComponent />
        </Main>
    )
}
