"use client";
import { ArrowLeftIcon } from "@sanity/icons";
import { useRouter } from "next/navigation";

export function GoBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={router.back}
      className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
    >
      <ArrowLeftIcon className="w-4 h-4" />
      Volver
    </button>
  );
}
