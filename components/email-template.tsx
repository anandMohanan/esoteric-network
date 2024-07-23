import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Container, Section } from './dividers';

export const EmailTemplate = () => {
    return (
        <Section>
            <Container>
                <div>
                    <Button
                        asChild
                        className="mb-6 w-fit"
                        size={"sm"}
                        variant={"outline"}
                    >
                        <a className="not-prose" href="https://horizon.vercel.app">
                            Visit our website for latest updates <ArrowRight className="w-4" />
                        </a>
                    </Button>
                    <h1>
                        Thank you for joining our waitlist!
                    </h1>
                    <h3 className="text-muted-foreground">
                        We're excited to have you on board. We'll be in touch soon with more information.
                    </h3>
                    <div className="not-prose my-8 h-96 w-full overflow-hidden rounded-lg border md:h-[480px] md:rounded-xl">
                    </div>
                </div>
            </Container>
        </Section>
    );
};

