import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    "https://rgis.vercel.app";

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
      url: `${baseUrl}/trainingAcademy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/proposalCenter`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/fundingOpportunities`,
      lastModified: new Date(),
    },
  ];
}
