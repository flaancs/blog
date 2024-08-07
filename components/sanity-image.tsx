import { getImageDimensions, SanityImageSource } from "@sanity/asset-utils";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImg } from "sanity";
import Image from "next/image";

export function SanityImage({ image }: { image: SanityImg }) {
  const alt: string = (image?.alt as string) ?? "Flaancs.dev";

  if (!image?.asset) {
    return null;
  }

  return (
    <Image
      src={urlFor(image).url()}
      alt={alt}
      width={getImageDimensions(image as SanityImageSource).width}
      height={getImageDimensions(image as SanityImageSource).height}
      placeholder="blur"
      blurDataURL={urlFor(image).width(24).height(24).blur(10).url()}
      className="rounded-md"
      sizes="
            (max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            40vw"
    />
  );
}
