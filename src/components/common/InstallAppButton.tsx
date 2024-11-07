"use client";

import useSideNavStore from "@/store/sideNavStore";
import clsx from "clsx";
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

export default function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [appInstalled, setAppInstalled] = useState(false);

  const checkUnsupportedBrowser = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return userAgent.indexOf("safari") > -1 && userAgent.indexOf("chrome") > -1;
  };

  const handleInstallAppPrompt = async () => {
    if (!checkUnsupportedBrowser()) return;

    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
  };

  const checkAppInstalled = async () => {
    try {
      const relatedApps = await navigator.getInstalledRelatedApps();
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

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener,
      );
    };
  }, []);

  return (
    <>
      {!appInstalled && deferredPrompt && (
        <button
          className={clsx("rounded bg-grey-800 px-2 py-1 text-xs text-white")}
          onClick={handleInstallAppPrompt}
        >
          홈 화면에 추가
        </button>
      )}
    </>
  );
}
