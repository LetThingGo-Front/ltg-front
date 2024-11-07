"use client";

import { duration } from "@/constants/animation/style";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface RelatedApplication {
  platform: string;
  url: string;
}

declare global {
  interface Navigator {
    getInstalledRelatedApps: () => Promise<RelatedApplication[]>;
  }
}

type PromptResponse = Promise<{
  outcome: "accepted" | "dismissed";
  platform: string;
}>;

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: PromptResponse;
  prompt(): PromptResponse;
}

const isBeforeInstallPromptEvent = (
  e: Event,
): e is BeforeInstallPromptEvent => {
  return "platforms" in e && "userChoice" in e && "prompt" in e;
};

const bannerVariants = {
  start: {
    opacity: 0,
    ease: "easeInOut",
    ...duration.medium,
  },
  end: {
    opacity: 1,
    ease: "easeInOut",
    ...duration.medium,
  },
  exit: { opacity: 0, ease: "easeInOut", ...duration.medium },
};

export default function InstallAppBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isOepn, setIsOpen] = useState(true);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  const handleInstallAppPrompt = async () => {
    if (isIOS) {
      alert(
        'iOS에서 홈 화면에 추가하려면, 아래의 공유 아이콘을 누르고 "홈 화면에 추가"를 선택하세요.',
      );
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("사용자가 설치를 수락했습니다.");
      } else {
        console.log("사용자가 설치를 거부했습니다.");
      }
      setDeferredPrompt(null);
    }
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      if (isBeforeInstallPromptEvent(e)) {
        e.preventDefault();
        setDeferredPrompt(e);
      }
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener,
    );

    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream,
    );
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener,
      );
    };
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <AnimatePresence>
      <motion.div
        className={clsx(
          "fixed bottom-0 left-0 z-20 flex w-full justify-center border-t-[1px] bg-white p-4",
          { hidden: !isOepn },
        )}
        variants={bannerVariants}
        initial="start"
        animate="end"
        exit="exit"
      >
        <div className="flex max-w-[37.5rem] flex-col gap-4">
          <div className="flex items-start gap-2">
            <p className="whitespace-normal break-keep text-grey-700">
              <span className="font-bold">렛띵고</span>를 홈 화면에 추가하여 더
              빠르게 접근할 수 있습니다. 설치하시겠습니까?
            </p>
            <button
              className="h-6 w-6 sm:p-1"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src="/assets/images/button/close_grey.svg"
                width={24}
                height={24}
                alt="close"
              />
            </button>
          </div>
          <button
            className="w-full rounded-lg bg-grey-700 px-4 py-2 text-sm text-white active:bg-grey-900"
            onClick={handleInstallAppPrompt}
          >
            홈 화면에 추가
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
