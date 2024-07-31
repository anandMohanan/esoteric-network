import { Container, Section } from "@/components/dividers";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Book, Camera } from "lucide-react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { HomeForm } from "./home-form";
import Image from "next/image";
import Sisyphus from "../../public/sisyphus.png";
import { cn } from "@/lib/utils";
import { primaryfont, secondaryfont, specialfont } from "@/lib/fonts";
import { validateUser } from "@/lib/validateuser";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const HomePageContent = async () => {
    const { user } = await validateUser()
    return (
        <Section>
            <Container>
                <div className="flex flex-col items-center text-center">
                    {!user &&
                        <Link
                            className={cn("not-prose text-2xl mb-6 flex w-fit", buttonVariants({ variant: "link" }), specialfont.className)}
                            href="/signin"
                        >
                            Join the Awakening  <Book className="ml-2 w-4" />
                        </Link>
                    }
                    {user &&
                        <Link
                            className={cn("not-prose text-4xl mb-6 font-[700px] flex w-fit",
                                buttonVariants({ variant: "link" }), specialfont.className)}
                            href="/home"
                        >
                            View the latest creations <Book className="ml-2 w-4" />
                        </Link>
                    }

                    <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl !mb-0", primaryfont.className)}>
                        <Balancer>
                            Share Your {" "}
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className="underline decoration-wavy decoration-cyan-500">
                                            Esoteric
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="w-[500px] text-xl">
                                            "Esoteric" means something that is understood or intended for only a small number of people with specialized knowledge or interest. It often refers to ideas, knowledge, or practices that are obscure or not widely known.
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            {" "}
                            Essence
                        </Balancer>
                    </h1>
                    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", secondaryfont.className)}>
                        <Balancer>
                            Post writings, art, and philosophies. Connect, comment, and support fellow seekers on their spiritual journeys.
                        </Balancer>
                    </p>
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
