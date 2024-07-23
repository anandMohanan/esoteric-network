"use client"

import { QueryClient, QueryClientProvider as Q } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
    return <Q client={queryClient}>{children}</Q>;
};
