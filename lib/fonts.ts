import { IBM_Plex_Mono, Proza_Libre, Cormorant } from "next/font/google"

export const primaryfont = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: "400",
    style: "normal",
    display: "swap",
})

export const secondaryfont = Proza_Libre({
    subsets: ["latin"],
    weight: "400",
    style: "normal",
    display: "swap",
})

export const specialfont = Cormorant({
    subsets: ["latin"],
    weight: "700",
    style: "normal",
    display: "swap",
})

