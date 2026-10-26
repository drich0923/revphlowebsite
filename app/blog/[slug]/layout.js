import { posts } from "../blog-data";
import { POST_META, pageMeta } from "../../seo";

export async function generateMetadata({ params }) {
  const post = posts.find((entry) => entry.slug === params.slug);

  if (!post) {
    return pageMeta({
      title: "Post Not Found | RevPhlo",
      description: "This RevPhlo article could not be found.",
      path: `/blog/${params.slug}`,
      noindex: true,
    });
  }

  const meta = POST_META[post.slug];
  if (!meta) {
    throw new Error(`Missing SEO metadata for blog post ${post.slug}`);
  }

  return pageMeta({
    title: meta.title,
    description: meta.description,
    path: `/blog/${post.slug}`,
    openGraph: {
      type: "article",
      publishedTime: post.date,
    },
  });
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostLayout({ children }) {
  return children;
}
