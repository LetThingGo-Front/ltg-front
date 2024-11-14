"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex h-full items-center justify-center">
          <div className="rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              문제가 발생했습니다.
            </h2>
            <p className="mt-2 text-gray-600">잠시 후 다시 시도해 주세요.</p>
            <button
              onClick={reset}
              className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700 active:bg-blue-700"
            >
              재시도
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
