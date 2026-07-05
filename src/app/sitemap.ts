import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    "https://rgis.netlify.app";

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/membership`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/training-academy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/proposal-center`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/funding-opportunities`,
      lastModified: new Date(),
    },
  ];
}
