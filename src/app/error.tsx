"use client";

import ErrorPage from "@/common/components/ErrorPage";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  useEffect(() => {
    const errorQueryKeys = JSON.parse(
      localStorage.getItem("errorQueryKeys") || "[]",
    );
    if (errorQueryKeys.length > 0) {
      // 각 queryKey를 순회하면서 cache에서 제거
      errorQueryKeys.forEach((queryKey: any) => {
        queryClient.removeQueries({ queryKey });
      });

      localStorage.removeItem("errorQueryKeys");
    }
  }, [queryClient]);

  return (
    <div className="flex h-[calc(100%-4rem)] w-full items-center justify-center sm:h-[calc(100%-5.625rem)]">
      <ErrorPage error={error} reset={reset} push={() => router.back()} />
    </div>
  );
}
