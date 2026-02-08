import { useEffect, useRef, useState } from "react";
import {
  useScrollContainer,
  useIsMobile,
  getScrollElement,
  getViewportHeight,
} from "../contexts/ScrollContext";
import DSC01904 from "../assets/DSC01904.jpg";

export default function ThankYouPage() {
  const headingRef = useRef<HTMLDivElement | null>(null);
  const signoffRef = useRef<HTMLDivElement | null>(null);

  const [headingActive, setHeadingActive] = useState(false);
  const [signoffActive, setSignoffActive] = useState(false);

  const scrollContainer = useScrollContainer();
  const isMobile = useIsMobile();

  useEffect(() => {
    const headingEl = headingRef.current;
    const signoffEl = signoffRef.current;

    const scrollElement = getScrollElement(scrollContainer, isMobile);

    let raf = 0;

    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const viewportHeight = getViewportHeight(scrollContainer, isMobile);

        // Heading + text (same as Gift Registry text)
        if (headingEl) {
          const rect = headingEl.getBoundingClientRect();
          const trigger = rect.top <= viewportHeight * 0.8;
          setHeadingActive(trigger);
        }

        // Sign-off text (slightly later)
        if (signoffEl) {
          const rect = signoffEl.getBoundingClientRect();
          const trigger = rect.top <= viewportHeight * 0.85;
          setSignoffActive(trigger);
        }
      });
    };

    handleScroll();
    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, [scrollContainer, isMobile]);

  return (
    <div className="w-full text-[#2a2a2a]">
      <div
        className="text-[#2a2a2a] px-5 py-10 flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/background+(3).png')",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        {/* Static card — NO animation */}
        <div
          className="max-w-3xl mx-auto text-center space-y-5 bg-white/90 border-5 border-white rounded-2xl px-5 pt-18 pb-8"
          style={{ boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.15)" }}
        >
          {/* Heading + text */}
          <div
            ref={headingRef}
            className={`space-y-6 transition-all duration-1000 ease-out ${headingActive
                ? "-translate-y-4 scale-100 opacity-100"
                : "scale-90 opacity-50"
              }`}
          >
            <h2 className="text-3xl font-serif">Thank You</h2>

            <p className="text-md text-[#535c4b] max-w-2xl mx-auto italic">
              It would mean the world to us to have you celebrate this special
              day together
            </p>
          </div>
          <div
            ref={headingRef}
            className={`space-y-6 transition-all duration-1000 ease-out aspect-square ${headingActive
                ? "-translate-y-4 scale-100 opacity-100"
                : "scale-90 opacity-50"
              }`}
          >
            <img src={DSC01904} alt="" className="h-full w-full object-cover object-center block rounded-2xl" />
          </div>

          <div className="pb-8 border-t border-[#535c4b]/20"></div>

          {/* Sign-off */}
          <div
            ref={signoffRef}
            className={`space-y-4 transition-all duration-1200 ease-out ${signoffActive
                ? "-translate-y-4 scale-100 opacity-100"
                : "scale-90 opacity-50"
              }`}
          >
            <p className="text-lg font-serif">With Love,</p>
            <div className="text-xl font-serif font-semibold text-[#535c4b]">
              Nathanael & Victoria
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
