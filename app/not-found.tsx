import { Section } from "@/components/dividers";
import { primaryfont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Balancer from "react-wrap-balancer";
import Image from "next/image";

export default function NotFound() {
    return (
        <Section>
            <h1 className={cn("scroll-m-20 text-4xl text-center font-extrabold tracking-tight lg:text-5xl !mb-0", primaryfont.className)}>
                <Balancer>
                    This page does not exist.
                </Balancer>
            </h1>
            <Image
                className="mx-auto m-10"
                src="/flower.png"
                alt="Sisyphus"
                width={600}
                height={800}
            />

        </Section>
    )
}
