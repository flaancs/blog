import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { POST_QUERYResult } from "@/sanity.types";
import { SanityImage } from "./sanity-image";
import { GoBackButton } from "./go-back";
import type { Image as SanityImg } from "sanity";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import CodeBlock from "./code-block";

const PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImg }) => {
      return <SanityImage image={value} />;
    },
    code: ({ value }: any) => {
      return <CodeBlock value={value} />;
    },
  },
};

export function Post({ post }: { post: POST_QUERYResult }) {
  const { title, mainImage, body, categories, tags, author, publishedAt } =
    post || {};

  return (
    <div className="flex-1 container mx-auto py-8 md:py-12 px-4 md:px-6">
      <article className="prose prose-gray max-w-3xl mx-auto dark:prose-invert">
        <div className="space-y-2 not-prose">
          <GoBackButton />
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
            {title}
          </h1>
          <p className="text-muted-foreground">
            Por {author?.name} • {moment.utc(publishedAt).local().format("LLL")}
          </p>
          <div className="flex flex-wrap gap-2">
            {categories?.map((category) => (
              <Link
                key={category._id}
                href={`/categories/${category.slug?.current}`}
                className="bg-muted px-3 py-1 rounded-full text-sm hover:underline"
                prefetch={false}
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
        {mainImage?.asset?._ref && (
          <div className="relative">
            <Image
              src={urlFor(mainImage.asset._ref).url()}
              width={800}
              height={400}
              alt="Main Image"
              className="aspect-[2/1] w-full rounded-md object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
          </div>
        )}
        {body ? (
          <PortableText value={body} components={PortableTextComponents} />
        ) : null}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag) => (
              <Link
                key={tag._id}
                href={`/tags/${tag.slug?.current}`}
                className="text-sm underline"
                prefetch={false}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
