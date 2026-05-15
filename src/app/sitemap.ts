import type { MetadataRoute } from "next";
import { simulators } from "@/lib/simulators";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://electrician-exam.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["", "/simulator"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  const simRoutes = simulators
    .filter((s) => s.status === "available")
    .map((s) => ({
      url: `${SITE_URL}/simulator/${s.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...simRoutes];
}
