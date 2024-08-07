import { QueryParams } from "next-sanity";
import { notFound } from "next/navigation";
import {
  CATEGORIES_QUERY,
  CATEGORY_AND_POSTS_QUERY,
} from "@/sanity/lib/queries";
import { client, sanityFetch } from "@/sanity/lib/client";
import {
  CATEGORIES_QUERYResult,
  CATEGORY_AND_POSTS_QUERYResult,
} from "@/sanity.types";
import { Metadata } from "next";
import { Posts } from "@/components/posts";
import { GoBackButton } from "@/components/go-back";

export async function generateMetadata({
  params,
}: {
  params: QueryParams;
}): Promise<Metadata> {
  const category = await sanityFetch<CATEGORY_AND_POSTS_QUERYResult>({
    query: CATEGORY_AND_POSTS_QUERY,
    params,
  });

  if (category) {
    return {
      title: `Flaancs.dev - ${category.title || "Categoria"}`,
      description:
        category.description || "Blog de desarrollo web y tecnología.",
      openGraph: {
        title: `Flaancs.dev - ${category.title || "Categoria"}`,
        description:
          category.description || "Blog de desarrollo web y tecnología.",
        type: "website",
        locale: "es",
        images: [
          {
            url: "/images/og.png",
            alt: category.title || "Flaancs.dev",
          },
        ],
      },
      keywords: category.title,
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
          url: "/images/og.png",
          alt: "Flaancs.dev",
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const categories = await client.fetch<CATEGORIES_QUERYResult>(
    CATEGORIES_QUERY,
    {}
  );

  return categories.map((category) => ({
    slug: category?.slug?.current,
  }));
}

export default async function Page({ params }: { params: QueryParams }) {
  const category = await sanityFetch<CATEGORY_AND_POSTS_QUERYResult>({
    query: CATEGORY_AND_POSTS_QUERY,
    params,
  });

  if (!category) {
    return notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <GoBackButton />
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
          {category.title}
        </h1>
      </div>
      <Posts posts={category.posts} />
    </div>
  );
}
