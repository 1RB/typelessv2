import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "Typeless",
  author: "Team RAMM",
  description:
    "a centralized dashboard to help post to multiple social media platforms at once.",
  motto: "Post Smarter, Not Harder.",
  keywords: ["Next.js", "React", "Tailwind CSS", "Radix UI", "shadcn/ui"],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://dablie.org",
  },
  links: {
    github: "https://github.com/1rb/smmt",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.png`,
}
