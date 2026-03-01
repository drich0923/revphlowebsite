import { posts } from "../../blog-data";

export async function generateMetadata({ params }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://revphlo.com/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | RevPhlo`,
      description: post.description,
      url: `https://revphlo.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostLayout({ children }) {
  return children;
}
