import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import VideoPage from "./VideoPage";
import {
  useScrollContainer,
  useIsMobile,
  getScrollElement,
} from "../contexts/ScrollContext";

export default function LandingPage() {
  const [allowScroll, setAllowScroll] = useState(false);
  const allowScrollRef = useRef(allowScroll);
  const invitationRef = useRef<HTMLDivElement | null>(null);
  const scrollContainer = useScrollContainer();
  const isMobile = useIsMobile();

  // Keep ref in sync with state
  useEffect(() => {
    allowScrollRef.current = allowScroll;
  }, [allowScroll]);

  // Stable function reference for preventing scroll
  const preventScrollRef = useRef<(e: Event) => void>((e: Event) => {
    if (!allowScrollRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  const scrollToElement = useCallback(
    (element: HTMLElement, duration = 1400) => {
      const scrollElement = getScrollElement(scrollContainer, isMobile);
      const isWindow = scrollElement === window;
      const start = isWindow
        ? window.scrollY
        : (scrollElement as HTMLDivElement).scrollTop;
      const end =
        element.getBoundingClientRect().top +
        (isWindow
          ? window.scrollY
          : (scrollElement as HTMLDivElement).scrollTop);
      const distance = end - start;
      const startTime = performance.now();

      const easeInOutQuad = (t: number) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutQuad(progress);

        if (isWindow) {
          window.scrollTo(0, start + distance * eased);
        } else {
          (scrollElement as HTMLDivElement).scrollTop =
            start + distance * eased;
        }

        if (elapsed < duration) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    },
    [scrollContainer, isMobile]
  );

  const handleOpenInvitation = useCallback(() => {
    setAllowScroll(true);
    if (invitationRef.current) {
      scrollToElement(invitationRef.current);
    }
  }, [scrollToElement]);

  // Try to stop the browser from restoring scroll position automatically
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      const previous = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";

      return () => {
        window.history.scrollRestoration = previous;
      };
    }
  }, []);

  // Lock/unlock scroll and force scroll to top when scroll is not allowed
  useLayoutEffect(() => {
    const scrollElement = getScrollElement(scrollContainer, isMobile);
    const isWindow = scrollElement === window;
    const previousBodyOverflow = document.body.style.overflow;

    // For desktop, also need to lock the scroll container
    let previousContainerOverflow: string | undefined;
    if (!isWindow && scrollContainer?.current) {
      previousContainerOverflow = scrollContainer.current.style.overflow;
    }

    // Use stable function reference for event listeners
    const preventScroll = preventScrollRef.current!;

    if (allowScroll) {
      document.body.style.overflow = "auto";
      if (!isWindow && scrollContainer?.current) {
        scrollContainer.current.style.overflow = "auto";
        scrollContainer.current.removeEventListener("wheel", preventScroll);
        scrollContainer.current.removeEventListener("touchmove", preventScroll);
      }
    } else {
      document.body.style.overflow = "hidden";
      // On desktop, also prevent scrolling in the container
      if (!isWindow && scrollContainer?.current) {
        scrollContainer.current.style.overflow = "hidden";
        // Prevent wheel and touch events
        scrollContainer.current.addEventListener("wheel", preventScroll, {
          passive: false,
        });
        scrollContainer.current.addEventListener("touchmove", preventScroll, {
          passive: false,
        });
      }
      // Force page back to the very top *before* paint
      if (isWindow) {
        window.scrollTo(0, 0);
      } else {
        (scrollElement as HTMLDivElement).scrollTop = 0;
      }
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      if (!isWindow && scrollContainer?.current) {
        if (previousContainerOverflow !== undefined) {
          scrollContainer.current.style.overflow = previousContainerOverflow;
        }
        scrollContainer.current.removeEventListener("wheel", preventScroll);
        scrollContainer.current.removeEventListener("touchmove", preventScroll);
      }
    };
  }, [allowScroll, scrollContainer, isMobile]);

  return (
    <div className="w-full">
      <div className="relative min-h-svh overflow-hidden font-serif">
        <img
          src="https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/hero.jpg"
          alt="Nathanael and Victoria"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex min-h-svh flex-col items-center justify-between px-6 py-15 text-white">
          <div className="w-full text-center space-y-3">
            <h2 className="text-md text-shadow-lg">The wedding of</h2>
            <h1 className="text-2xl italic text-shadow-lg">
              Nathanael & Victoria
            </h1>
          </div>

          <button
            onClick={handleOpenInvitation}
            className="rounded-full mb-10 font-medium text-sm bg-white px-6 py-2 text-[#2a2a2a] shadow-lg transition hover:shadow-xl focus:outline-none"
          >
            Open Invitation
          </button>
        </div>
      </div>

      <VideoPage invitationRef={invitationRef} shouldPlay={allowScroll} />
    </div>
  );
}
