import {
  NETWORK_ERROR_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
} from "@/common/constants/message";
import { AxiosError } from "axios";
import React from "react";

type ErrorProps = {
  error: Error & { digest?: string };
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
  let message = UNKNOWN_ERROR_MESSAGE;
  let detail;
  if (error instanceof AxiosError) {
    if (error.response) {
      message = error.response?.data?.message ?? error.message;
    } else if (error.request) {
      message = NETWORK_ERROR_MESSAGE;
    } else {
      message = UNKNOWN_ERROR_MESSAGE;
    }
  } else {
    detail = error.message;
  }

  return (
    <div className="rounded-lg bg-white p-6 text-center">
      <p className="whitespace-normal break-keep text-xl font-semibold text-grey-700">
        {message}
      </p>
      <p className="whitespace-normal break-keep text-sm text-grey-500">
        {detail}
      </p>
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={reset}
          className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          {resetText}
        </button>
        <button
          onClick={push}
          className="rounded bg-green-400 px-4 py-2 text-white transition hover:bg-green-600"
        >
          {pushText}
        </button>
      </div>
    </div>
  );
}
