import { Section } from "@/components/dividers";
import { primaryfont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Balancer from "react-wrap-balancer";

export default function NotFound() {
    return (
        <Section>
            <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl !mb-0", primaryfont.className)}>
                <Balancer>
                    This page does not exist
                </Balancer>
            </h1>
        </Section>
    )
}
