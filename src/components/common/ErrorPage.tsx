import React from "react";

type ErrorProps = {
  error: Error;
  reset: () => void;
  push: () => void;
  resetText?: string;
  pushText?: string;
};

export default function ErrorPage({
  error,
  reset,
  push,
  resetText = "재시도",
  pushText = "뒤로가기",
}: ErrorProps) {
  return (
    <div className="rounded-lg bg-white p-6 text-center">
      <p className="mb-4 whitespace-normal break-keep text-xl font-semibold text-gray-700">
        {error.message}
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={reset}
          className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          {resetText}
        </button>
        <button
          onClick={push}
          className="rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
        >
          {pushText}
        </button>
      </div>
    </div>
  );
}
