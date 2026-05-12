import type { MetadataRoute } from "next";
import { bosses } from "@/data/bosses";
import { builds } from "@/data/builds";
import { skills } from "@/data/skills";
import { absoluteUrl } from "@/lib/seo";

const lastModified = new Date();

function sitemapEntry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly",
) {
  return {
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    sitemapEntry("/", 1, "daily"),
    sitemapEntry("/builds", 0.9),
    sitemapEntry("/bosses", 0.9),
    sitemapEntry("/skills", 0.9),
    ...builds.map((build) => sitemapEntry(`/builds/${build.slug}`, 0.8)),
    ...bosses.map((boss) => sitemapEntry(`/bosses/${boss.slug}`, 0.8)),
    ...skills.map((skill) => sitemapEntry(`/skills/${skill.slug}`, 0.75)),
  ];
}
