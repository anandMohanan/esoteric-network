import { cn } from "@/lib/utils";

type LayoutProps = {
    children: React.ReactNode;
    className?: string;
};

 const Layout = ({ children, className }: LayoutProps) => {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn("scroll-smooth antialiased focus:scroll-auto", className)}
        >
            {children}
        </html>
    );
};

type MainProps = {
    children: React.ReactNode;
    className?: string;
    id?: string;
};

 const Main = ({ children, className, id }: MainProps) => {
    return (
        <main
            className={cn(
                "max-w-none prose-p:m-0",
                "prose:font-sans prose prose-neutral dark:prose-invert xl:prose-lg",
                "prose-headings:font-normal",
                "prose-strong:font-semibold",
                "prose-a:text-foreground/75 prose-a:underline prose-a:decoration-primary/50 prose-a:underline-offset-2 prose-a:transition-all",
                "hover:prose-a:text-foreground hover:prose-a:decoration-primary",
                "prose-blockquote:not-italic",
                "prose-pre:border prose-pre:bg-muted/25 prose-pre:text-foreground",
                className,
            )}
            id={id}
        >
            {children}
        </main>
    );
};

type SectionProps = {
    children: React.ReactNode;
    className?: string;
    id?: string;
};

const Section = ({ children, className, id }: SectionProps) => {
    return (
        <section className={cn("py-8 md:py-12", className)} id={id}>
            {children}
        </section>
    );
};

type ContainerProps = {
    children: React.ReactNode;
    className?: string;
    id?: string;
};

const Container = ({ children, className, id }: ContainerProps) => {
    return (
        <div className={cn("mx-auto max-w-5xl", "p-6 sm:p-8", className)} id={id}>
            {children}
        </div>
    );
};

type ArticleProps = {
    children: React.ReactNode;
    className?: string;
    id?: string;
};

const Article = ({ children, className, id }: ArticleProps) => {
    return (
        <article
            className={cn(
                "prose:font-sans prose prose-neutral max-w-none dark:prose-invert xl:prose-lg",
                "prose-headings:font-normal",
                "prose-p:mb-0",
                "prose-strong:font-semibold",
                "prose-img: prose-img:m-0",
                "prose-a:text-foreground/75 prose-a:underline prose-a:decoration-primary/50 prose-a:underline-offset-2 prose-a:transition-all",
                "hover:prose-a:text-foreground hover:prose-a:decoration-primary",
                "prose-blockquote:not-italic",
                "prose-pre:border prose-pre:bg-muted/25",
                className,
            )}
            id={id}
        >
            {children}
        </article>
    );
};

export { Layout, Main, Section, Container, Article };
