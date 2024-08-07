import { POSTS_QUERYResult } from "@/sanity.types";
import { ArrowRightIcon } from "@sanity/icons";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";

import "moment/locale/es";
import { urlFor } from "@/sanity/lib/image";
moment.locale("es");

export function Posts({ posts }: { posts: POSTS_QUERYResult }) {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article
          className="space-y-4 rounded border p-4 hover:shadow-xl"
          key={post._id}
        >
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div>
                {post.mainImage?.asset?._ref && (
                  <div className="relative w-40 h-40">
                    <Image
                      src={urlFor(post.mainImage.asset._ref).url()}
                      width={160}
                      height={160}
                      alt="Main Image"
                      className="aspect-[1/1] w-full rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <div>{post.author?.name}</div>
                  <div>•</div>
                  <div>
                    {moment.utc(post.publishedAt).local().format("LLL")}
                  </div>
                </div>
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p className="text-muted-foreground">{post.extract}</p>
                <Link
                  href={`/posts/${post?.slug?.current}`}
                  className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                  prefetch={false}
                >
                  Seguir leyendo
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
