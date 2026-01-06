import { useEffect, useRef, useState } from "react";
import {
  useScrollContainer,
  useIsMobile,
  getScrollElement,
  getViewportHeight,
} from "../contexts/ScrollContext";

export default function RSVPPage() {
  const rsvpRef = useRef<HTMLDivElement | null>(null);
  const [rsvpActive, setRspvActive] = useState(false);
  const scrollContainer = useScrollContainer();
  const isMobile = useIsMobile();

  useEffect(() => {
    const rsvpEl = rsvpRef.current;
    if (!rsvpEl) return;

    const scrollElement = getScrollElement(scrollContainer, isMobile);

    const handleScroll = () => {
      const rsvpRect = rsvpEl.getBoundingClientRect();
      const viewportHeight = getViewportHeight(scrollContainer, isMobile);

      // Cards animate when they reach 80% of viewport
      const rsvpTrigger = rsvpRect.top <= viewportHeight * 0.6;

      setRspvActive(rsvpTrigger);
    };

    handleScroll();
    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [scrollContainer, isMobile]);

  return (
    <div className="w-full bg-[#ffedf3] text-[#2a2a2a] py-4 pt-15 px-6">
      <div className="max-w-5xl mx-auto space-y-16 font-serif">
        <div
          className={`grid gap-8 rounded-2xl p-4 pt-20 relative overflow-hidden transition-all duration-1500 ease-out ${
            rsvpActive
              ? "-translate-y-15 scale-100 opacity-100"
              : "-translate-y-12 scale-90 opacity-50"
          }`}
          ref={rsvpRef}
        >
          {/* Ceremony */}
          <div
            className={`rounded-2xl p-4 relative overflow-hidden transition-all duration-1500 ease-out `}
            style={{
              backgroundImage: `url(https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/background+(4).png)`,
              backgroundSize: "cover",
              backgroundPosition: "top",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="bg-white/90 rounded-2xl border-white border-5 p-8 shadow-lg text-center space-y-6"
              style={{ boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.15)" }}
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold">RSVP</h3>
                <div className="w-20 h-0.5 bg-[#535c4b] mx-auto"></div>
              </div>

              <div className="space-y-3">
                <p className="italic text-[#797979]">
                  Please let us know if you will be attending
                </p>
                <button
                  className="rounded-full py-3 px-8 bg-[#ffe4e6]"
                  onClick={() => {
                    window.open(
                      "https://docs.google.com/forms/d/e/1FAIpQLSc5dNFCjVkcVu1vwPhoag-EKVEpOr4JBWpgx03qYBxzT-ns-g/viewform",
                      "_blank"
                    );
                  }}
                >
                  Click here to confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
