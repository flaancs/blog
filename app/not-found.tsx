import { ArrowLeftIcon } from "@sanity/icons";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex-1 container mx-auto py-8 md:py-12 px-4 md:px-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
          Página no encontrada
        </h1>
        <p className="text-muted-foreground">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
          prefetch={false}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Volver
        </Link>
      </div>
    </div>
  );
}
