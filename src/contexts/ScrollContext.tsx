import { createContext, useContext, useState, useEffect } from "react";
import type { RefObject } from "react";


export type ScrollContextType = {
  scrollContainer: RefObject<HTMLDivElement | null>;
  allowScroll: boolean;
  setAllowScroll: (v: boolean) => void;
} | null;

export const ScrollContext = createContext<ScrollContextType>(null);


export const useScrollContainer = () => {
  const context = useContext(ScrollContext);

  if (!context) {
    throw new Error("useScrollContainer must be used within ScrollContext.Provider");
  }

  return context.scrollContainer;
};

// Hook to track if we're on mobile (reactive to window resize)
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 640;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

// Helper to get the scroll element (container or window)
export const getScrollElement = (
  scrollContainer: RefObject<HTMLDivElement | null> | null,
  isMobile: boolean
): HTMLElement | Window => {
  // On mobile, always use window since the page scrolls, not a container
  if (isMobile) {
    return window;
  }
  // On desktop, use container if it exists
  if (scrollContainer?.current) {
    return scrollContainer.current;
  }
  return window;
};

// Helper to get viewport height
export const getViewportHeight = (
  scrollContainer: RefObject<HTMLDivElement | null> | null,
  isMobile: boolean
): number => {
  // On mobile, always use window height
  if (isMobile) {
    return window.innerHeight;
  }
  // On desktop, use container height if it exists
  if (scrollContainer?.current) {
    return scrollContainer.current.clientHeight;
  }
  return window.innerHeight;
};

