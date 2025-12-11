import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import landingHero from "../assets/landing-hero.jpg";
import VideoPage from "./VideoPage";

export default function LandingPage() {
  const [allowScroll, setAllowScroll] = useState(false);
  const invitationRef = useRef<HTMLDivElement | null>(null);

  const scrollToElement = useCallback(
    (element: HTMLElement, duration = 1400) => {
      const start = window.scrollY;
      const end = element.getBoundingClientRect().top + window.scrollY;
      const distance = end - start;
      const startTime = performance.now();

      const easeInOutQuad = (t: number) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutQuad(progress);

        window.scrollTo(0, start + distance * eased);

        if (elapsed < duration) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    },
    []
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
    const previousOverflow = document.body.style.overflow;

    if (allowScroll) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
      // Force page back to the very top *before* paint
      window.scrollTo(0, 0);
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [allowScroll]);

  return (
    <div className="w-full bg-[#535c4b]">
      <div className="relative min-h-screen overflow-hidden">
        <img
          src="https://live.staticflickr.com/65535/54977448565_5e6248ef6d_b.jpg"
          alt="Nathanael and Victoria"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-6 py-15 text-white">
          <div className="w-full text-center space-y-3">
            <h2 className="text-md md:text-lg">The wedding of</h2>
            <h1 className="text-2xl leading-tight sm:text-5xl md:text-6xl">
              Nathanael &amp; Victoria
            </h1>
            <h3 className="text-sm md:text-xl">22 Aug 2025</h3>
          </div>

          <button
            onClick={handleOpenInvitation}
            className="rounded-full bg-white px-6 py-2 sm:text-md md:text-md lg:text-lg text-xs font-semibold text-[#233235] shadow-lg transition hover:shadow-xl focus:outline-none"
          >
            Open Invitation
          </button>
        </div>
      </div>

      <VideoPage invitationRef={invitationRef} />
    </div>
  );
}
