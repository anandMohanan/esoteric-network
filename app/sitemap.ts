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
        priority: 0.5
    },
    {
        url: "https://www.esotericnetwork.site/create",
        lastModified: new Date(),
        priority: 0.7
    },

    ]
}
