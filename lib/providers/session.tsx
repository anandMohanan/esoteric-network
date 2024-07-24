"use client"

import { User, Session } from "lucia"
import { createContext, useContext } from "react"

interface SessionProviderProps {
    user: User | null,
    session: Session | null,
}


export const SessionContext = createContext<SessionProviderProps>({
} as SessionProviderProps)

export const SessionProvider = ({ children, value }: { children: React.ReactNode, value: SessionProviderProps }) => {
    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    )
}


export const useSession = () => {
    const context = useContext(SessionContext)
    if (!context) {
        throw new Error("useSession must be used within a SessionProvider")
    }
    return context
}
