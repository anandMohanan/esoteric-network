import { MetadataRoute } from "next"
export default function sitemap(): MetadataRoute.Sitemap {
    return [{
        url: "https://www.esotericnetwork.site/",
        lastModified: new Date(),
        priority: 1
    },
    {
        url: "https://www.esotericnetwork.site/about",
        lastModified: new Date(),
        priority: 0.5
    },
    {
        url: "https://www.esotericnetwork.site/home",
        lastModified: new Date(),
        priority: 0.9
    },
    {
        url: "https://www.esotericnetwork.site/create",
        lastModified: new Date(),
        priority: 0.7
    },
    {
        url: "https://www.esotericnetwork.site/signin",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8
    },
    {
        url: "https://www.esotericnetwork.site/signup",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8
    },

    ]
}
