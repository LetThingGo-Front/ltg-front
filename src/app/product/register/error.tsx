// app/error.tsx
"use client";

import ErrorPage from "@/components/common/ErrorPage";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorModal({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  return (
    <div className="flex h-[calc(90%-4rem)] w-full items-center justify-center sm:h-[calc(90%-5.625rem)]">
      <ErrorPage error={error} reset={reset} push={() => router.back()} />
    </div>
  );
}
