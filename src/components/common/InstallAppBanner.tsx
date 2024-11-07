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
  const [appInstalled, setAppInstalled] = useState(false);
  const [isOepn, setIsOpen] = useState(false);

  const checkUnsupportedBrowser = () => {
    const userAgent = window.navigator.userAgent;
    // Safari와 Firefox를 포함하지 않는 조건
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    const isFirefox = /Firefox/.test(userAgent);

    return !isSafari && !isFirefox;
  };

  const handleInstallAppPrompt = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("사용자가 설치를 수락했습니다.");
      } else {
        console.log("사용자가 설치를 거부했습니다.");
      }
      setDeferredPrompt(null);
      setIsOpen(false);
    }
  };

  const checkAppInstalled = async () => {
    try {
      const relatedApps = await window.navigator.getInstalledRelatedApps();
      console.log(relatedApps);
      const isInstalled = relatedApps.length > 0;
      setAppInstalled(isInstalled);
    } catch (error) {
      setAppInstalled(false);
    }
  };

  useEffect(() => {
    checkAppInstalled();
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

    const isSupported = checkUnsupportedBrowser();
    if (!appInstalled && isSupported) setIsOpen(true);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener,
      );
    };
  }, [appInstalled]);

  return (
    <AnimatePresence>
      <motion.div
        className={clsx(
          "fixed bottom-0 left-0 z-20 flex w-full flex-col items-center gap-4 border-t-[1px] bg-white p-4",
          !isOepn && "hidden",
        )}
        variants={bannerVariants}
        initial="start"
        animate="end"
        exit="exit"
      >
        <div className="flex items-start gap-2">
          <p className="whitespace-normal break-keep text-grey-700">
            <span className="font-bold">렛띵고</span>를 쉽고 빠르게 이용하실 수
            있습니다. 설치하시겠습니까?
          </p>
          <button
            className="h-6 w-6 p-1"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src="/assets/images/button/close_grey.svg"
              width={20}
              height={20}
              alt="banner close"
            />
          </button>
        </div>
        <div className="flex w-full justify-end sm:justify-center">
          <button
            className={clsx("rounded bg-grey-800 px-4 py-2 text-xs text-white")}
            onClick={handleInstallAppPrompt}
          >
            홈 화면에 추가
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
