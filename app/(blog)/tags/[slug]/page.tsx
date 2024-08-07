import { QueryParams } from "next-sanity";
import { notFound } from "next/navigation";
import { TAG_AND_POSTS_QUERY, TAGS_QUERY } from "@/sanity/lib/queries";
import { client, sanityFetch } from "@/sanity/lib/client";
import { TAG_AND_POSTS_QUERYResult, TAGS_QUERYResult } from "@/sanity.types";
import { Metadata } from "next";
import { Posts } from "@/components/posts";
import { GoBackButton } from "@/components/go-back";

export async function generateMetadata({
  params,
}: {
  params: QueryParams;
}): Promise<Metadata> {
  const tag = await sanityFetch<TAG_AND_POSTS_QUERYResult>({
    query: TAG_AND_POSTS_QUERY,
    params,
  });

  if (tag) {
    return {
      title: `Flaancs.dev - ${tag.name || "Tag"}`,
      description: tag.description || "Blog de desarrollo web y tecnología.",
      openGraph: {
        title: `Flaancs.dev - ${tag.name || "Categoria"}`,
        description: tag.description || "Blog de desarrollo web y tecnología.",
        type: "website",
        locale: "es",
        images: [
          {
            url: "/images/icon.png",
            alt: tag.name || "Flaancs.dev",
          },
        ],
      },
      keywords: tag.name,
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
  const tags = await client.fetch<TAGS_QUERYResult>(TAGS_QUERY, {});

  return tags.map((tag) => ({
    slug: tag?.slug?.current,
  }));
}

export default async function Page({ params }: { params: QueryParams }) {
  const tag = await sanityFetch<TAG_AND_POSTS_QUERYResult>({
    query: TAG_AND_POSTS_QUERY,
    params,
  });

  if (!tag) {
    return notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <GoBackButton />
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
          {tag.name}
        </h1>
      </div>
      <Posts posts={tag.posts} />
    </div>
  );
}
