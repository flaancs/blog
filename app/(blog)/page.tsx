import { Posts } from "@/components/posts";
import { sanityFetch } from "@/sanity/lib/client";
import {
  CATEGORIES_QUERY,
  POSTS_QUERY,
  TAGS_QUERY,
} from "@/sanity/lib/queries";
import {
  CATEGORIES_QUERYResult,
  POSTS_QUERYResult,
  TAGS_QUERYResult,
} from "@/sanity.types";
import Link from "next/link";

export default async function Page() {
  const posts = await sanityFetch<POSTS_QUERYResult>({
    query: POSTS_QUERY,
  });

  const categories = await sanityFetch<CATEGORIES_QUERYResult>({
    query: CATEGORIES_QUERY,
  });

  const tags = await sanityFetch<TAGS_QUERYResult>({
    query: TAGS_QUERY,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8">
      <Posts posts={posts} />
      <aside className="space-y-8">
        <div className="space-y-4 border rounded p-4">
          <div className="border-b pb-2">
            <h3 className="text-lg font-bold">Categorias</h3>
          </div>
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
        <div className="space-y-4 border rounded p-4">
          <div className="pb-2 border-b">
            <h3 className="text-lg font-bold">Tags</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag) => (
              <Link
                key={tag._id}
                href={`/tags/${tag.slug?.current}`}
                className="bg-muted px-3 py-1 rounded-full text-sm hover:underline"
                prefetch={false}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
