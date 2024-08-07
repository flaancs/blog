import { QueryParams } from "next-sanity";
import { notFound } from "next/navigation";
import { POSTS_QUERY, POST_QUERY } from "@/sanity/lib/queries";
import { client, sanityFetch } from "@/sanity/lib/client";
import { POST_QUERYResult, POSTS_QUERYResult } from "@/sanity.types";
import { Post } from "@/components/post";
import { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";

export async function generateMetadata({
  params,
}: {
  params: QueryParams;
}): Promise<Metadata> {
  const post = await sanityFetch<POST_QUERYResult>({
    query: POST_QUERY,
    params,
  });

  if (post) {
    return {
      title: `Flaancs.dev - ${post.title || "Post"}`,
      description: post.extract || "Blog de desarrollo web y tecnología.",
      openGraph: {
        title: `Flaancs.dev - ${post.title || "Post"}`,
        description: post.extract || "Blog de desarrollo web y tecnología.",
        type: "article",
        publishedTime: post.publishedAt || undefined,
        modifiedTime: post._updatedAt || undefined,
        authors: post.author?.name ? [post.author.name] : undefined,
        section: post.categories?.map((category) => category.title).join(", "),
        tags: post.tags?.map((tag) => tag.name || ""),
        locale: "es",
        images: [
          {
            url: post.mainImage?.asset?._ref
              ? urlFor(post.mainImage?.asset?._ref).width(300).height(300).url()
              : "/images/icon.png",
            alt: post.mainImage?.alt || "Flaancs.dev",
          },
        ],
      },
      keywords: post.tags?.map((tag) => tag.name).join(", "),
    };
  }

  return {
    title: "Flaancs.dev",
    description: "Blog de desarrollo web y tecnología.",
    openGraph: {
      title: "Flaancs.dev",
      description: "Blog de desarrollo web y tecnología.",
      type: "article",
      locale: "es",
      images: [
        {
          url: "/images/icon.png",
          alt: "Flaancs.dev",
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = await client.fetch<POSTS_QUERYResult>(
    POSTS_QUERY,
    {},
    { perspective: "published" }
  );

  return posts.map((post) => ({
    slug: post?.slug?.current,
  }));
}

export default async function Page({ params }: { params: QueryParams }) {
  const post = await sanityFetch<POST_QUERYResult>({
    query: POST_QUERY,
    params,
  });
  if (!post) {
    return notFound();
  }
  return <Post post={post} />;
}
