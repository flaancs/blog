import { Manrope } from "next/font/google";
import { cn } from "@/lib/utils";
import { Metadata, Viewport } from "next";
import { TAGS_QUERYResult } from "@/sanity.types";
import { TAGS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/client";
import { GoogleAnalytics } from "@/components/google-analytics";

import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const fontHeading = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export async function generateMetadata(): Promise<Metadata> {
  const tags = await sanityFetch<TAGS_QUERYResult>({
    query: TAGS_QUERY,
  });

  return {
    title: "Flaancs.dev",
    description: "Blog de desarrollo web y tecnología.",
    openGraph: {
      title: "Flaancs.dev",
      description: "Blog de desarrollo web y tecnología.",
      type: "website",
      locale: "es",
      images: [
        {
          url: "/images/og.png",
          alt: "Flaancs.dev",
        },
      ],
    },
    keywords: tags?.map((tag) => tag.name).join(", "),
  };
}

export const viewport: Viewport = {
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0E0E0F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <GoogleAnalytics />
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <div className="flex flex-col min-h-screen font-mono">
          <header className="bg-background border-b px-4 md:px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-4 text-2xl font-bold"
              prefetch={false}
            >
              <Image
                src="/images/icon.png"
                alt="Flaancs.dev"
                width={30}
                height={30}
              />
              Flaancs.dev
            </Link>
          </header>
          <div className="flex-1 container mx-auto py-8 md:py-12 px-4 md:px-6">
            <main>
              <div className="space-y-8">{children}</div>
            </main>
          </div>
          <footer className="border-t py-4 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Flaancs.dev</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
