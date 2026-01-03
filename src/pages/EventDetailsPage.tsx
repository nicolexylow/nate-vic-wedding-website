import { useEffect, useRef, useState } from "react";
import {
  useScrollContainer,
  useIsMobile,
  getScrollElement,
  getViewportHeight,
} from "../contexts/ScrollContext";

export default function EventDetailsPage() {
  const ceremonyRef = useRef<HTMLDivElement | null>(null);
  const receptionRef = useRef<HTMLDivElement | null>(null);
  const [ceremonyActive, setCeremonyActive] = useState(false);
  const [receptionActive, setReceptionActive] = useState(false);
  const scrollContainer = useScrollContainer();
  const isMobile = useIsMobile();

  useEffect(() => {
    const ceremonyEl = ceremonyRef.current;
    const receptionEl = receptionRef.current;
    if (!ceremonyEl || !receptionEl) return;

    const scrollElement = getScrollElement(scrollContainer, isMobile);

    const handleScroll = () => {
      const ceremonyRect = ceremonyEl.getBoundingClientRect();
      const receptionRect = receptionEl.getBoundingClientRect();
      const viewportHeight = getViewportHeight(scrollContainer, isMobile);

      // Cards animate when they reach 80% of viewport
      const ceremonyTrigger = ceremonyRect.top <= viewportHeight * 0.8;
      const receptionTrigger = receptionRect.top <= viewportHeight * 0.8;

      setCeremonyActive(ceremonyTrigger);
      setReceptionActive(receptionTrigger);
    };

    handleScroll();
    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [scrollContainer, isMobile]);

  return (
    <div className="w-full bg-[#ffedf3] text-[#233235] py-8 px-6">
      <div className="max-w-5xl mx-auto space-y-16 font-serif">
        <div className="grid gap-8">
          {/* Ceremony */}
          <div
            ref={ceremonyRef}
            className={`rounded-2xl p-4 relative overflow-hidden transition-all duration-1500 ease-out ${
              ceremonyActive
                ? "-translate-y-15 scale-100 opacity-100"
                : "-translate-y-12 scale-90 opacity-50"
            }`}
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dvlbwxug3/image/upload/v1766581417/background_4_dozyxo.png)`,
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
                <h3 className="text-2xl font-serif font-bold">
                  Ceremony
                </h3>
                <div className="w-20 h-0.5 mx-auto"></div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xl">Friday</p>
                  <p className="text-xl font-bold text-[#535c4b]">
                    22 August 2025
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-lg">3:00 PM - 4:00 PM</p>
                </div>

                <div className="space-y-1 pt-4">
                  <p className="text-base font-medium">Venue Name</p>
                  <p className="text-sm text-[#535c4b]">
                    123 Wedding Lane
                    <br />
                    City, State 12345
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reception */}
          <div
            ref={receptionRef}
            className={`rounded-2xl p-4 relative overflow-hidden transition-all duration-1000 ease-out ${
              receptionActive
                ? "-translate-y-15 scale-100 opacity-100"
                : "-translate-y-12 scale-90 opacity-50"
            }`}
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dvlbwxug3/image/upload/v1766581417/background_4_dozyxo.png)`,
              backgroundSize: "cover",
              backgroundPosition: "top",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="bg-white/90 rounded-2xl border-white border-5 p-8 shadow-lg text-center space-y-6"
              style={{ boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.15)" }}
            >
              {" "}
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold">
                  Reception
                </h3>
                <div className="w-20 h-0.5 mx-auto"></div>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xl">Friday</p>
                  <p className="text-xl font-bold text-[#535c4b]">
                    22 August 2025
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-lg">5:00 PM - 10:00 PM</p>
                </div>

                <div className="space-y-1 pt-4">
                  <p className="text-base font-medium">Venue Name</p>
                  <p className="text-sm text-[#535c4b]">
                    123 Wedding Lane
                    <br />
                    City, State 12345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
