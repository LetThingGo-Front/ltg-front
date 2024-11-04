"use client";

import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export const KeyboardProvider = ({ children }: Props) => {
  useEffect(() => {
    console.log(window);
    if (window.visualViewport)
      window.visualViewport.addEventListener("resize", handleResize, false);

    return () => {
      if (window.visualViewport)
        window.visualViewport.removeEventListener(
          "resize",
          handleResize,
          false,
        );
    };
  }, []);

  const handleResize = () => {
    if (window.visualViewport) {
      document.documentElement.style.setProperty(
        "--keyboard-inset-height",
        `${window.innerHeight - Math.round(window.visualViewport.height)}px`,
      );
    }
  };

  return children;
};
