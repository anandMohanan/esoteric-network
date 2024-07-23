
import { Container, Section } from "@/components/dividers";
import { Button } from "@/components/ui/button";
import { ArrowRight, Book, Camera } from "lucide-react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { HomeForm } from "./home-form";
import Image from "next/image";
import Sisyphus from "../../public/sisyphus.png";
import { cn } from "@/lib/utils";
import { primaryfont, secondaryfont, specialfont } from "@/lib/fonts";


export const HomePageContent = () => {
    return (
        <Section>
            <Container>
                <div className="flex flex-col items-center text-center">
                    <Button
                        className={cn("not-prose cursor-cell text-xl mb-6 flex w-fit", specialfont.className)}
                        size="sm"
                        variant="outline"
                    >

                        Join the Awakening  <Book className="ml-2 w-4" />
                    </Button>

                    <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl !mb-0", primaryfont.className)}>
                        <Balancer>
                            Horizon: Share Your Esoteric Essence
                        </Balancer>
                    </h1>
                    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", secondaryfont.className)}>
                        <Balancer>
                            Unleash your inner mystic. Post writings, art, and philosophies. Connect, comment, and support fellow seekers on their spiritual journeys.
                        </Balancer>
                    </p>
                    <HomeForm />
                    <div className="my-8 h-96 w-full overflow-hidden rounded-lg border md:h-[480px] md:rounded-xl">
                        <Image
                            className="not-prose h-full w-full object-cover object-bottom"
                            src={Sisyphus}
                            width={1920}
                            height={1080}
                            alt="hero image"
                            placeholder="blur"
                        />

                    </div>
                </div>
            </Container>
        </Section>
    );
}
