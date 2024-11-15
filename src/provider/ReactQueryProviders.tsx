"use client";

import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function ReactQueryProviders({
  children,
}: React.PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false, // 윈도우가 다시 포커스되었을때 데이터를 refetch
          refetchOnMount: false, // 데이터가 stale 상태이면 컴포넌트가 마운트될 때 refetch
          retry: false, // API 요청 실패시 재시도 하는 옵션 (설정값 만큼 재시도)
          throwOnError: true,
        },
      },
      queryCache: new QueryCache({
        onError: (error, query) => {
          if (query.queryKey) {
            const existingKeys = JSON.parse(
              localStorage.getItem("errorQueryKeys") || "[]",
            );
            existingKeys.push(query.queryKey);
            localStorage.setItem(
              "errorQueryKeys",
              JSON.stringify(existingKeys),
            );
          }
        },
      }),
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
