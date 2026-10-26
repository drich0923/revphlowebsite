import { pageUrl } from "./seo";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: pageUrl("/sitemap.xml"),
  };
}
