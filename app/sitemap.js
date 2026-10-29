import { posts } from "./blog/blog-data";
import { pageUrl } from "./seo";

const CONTENT_UPDATED = "2026-09-30";

const COMPARE_SLUGS = [
  "revphlo-vs-databox",
  "revphlo-vs-hubspot-reporting",
  "revphlo-vs-gohighlevel-reporting",
  "revphlo-vs-spreadsheets",
];

const GUIDE_SLUGS = [
  "best-revenue-attribution-software-high-ticket-sales",
  "best-sales-reporting-tools-high-ticket-teams",
];

function entry(path, { lastModified, changeFrequency, priority }) {
  return {
    url: pageUrl(path),
    lastModified,
    changeFrequency,
    priority,
  };
}

export default function sitemap() {
  const latestPostDate = posts.reduce(
    (latest, post) => (post.date > latest ? post.date : latest),
    posts[0]?.date || CONTENT_UPDATED
  );

  const staticPages = [
    entry("/", { lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 1 }),
    entry("/about", { lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.6 }),
    entry("/demo", { lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.8 }),
    entry("/blog", { lastModified: latestPostDate, changeFrequency: "weekly", priority: 0.8 }),
    entry("/privacy-policy", { lastModified: "2026-10-29", changeFrequency: "monthly", priority: 0.3 }),
    entry("/cookie-policy", { lastModified: "2026-10-29", changeFrequency: "monthly", priority: 0.3 }),
    entry("/terms-of-service", { lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.3 }),
  ];

  const comparePages = COMPARE_SLUGS.map((slug) =>
    entry(`/compare/${slug}`, {
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const guidePages = GUIDE_SLUGS.map((slug) =>
    entry(`/blog/${slug}`, {
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const blogPages = posts.map((post) =>
    entry(`/blog/${post.slug}`, {
      lastModified: post.date,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...staticPages, ...comparePages, ...guidePages, ...blogPages];
}
