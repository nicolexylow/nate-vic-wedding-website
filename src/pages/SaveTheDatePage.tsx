import { useEffect, useRef, useState } from "react";
import {
  useScrollContainer,
  useIsMobile,
  getScrollElement,
  getViewportHeight,
} from "../contexts/ScrollContext";

export default function SaveTheDatePage() {
  const headingRef = useRef<HTMLDivElement | null>(null);
  const dateRef = useRef<HTMLDivElement | null>(null);
  const [headingActive, setHeadingActive] = useState(false);
  const [dateActive, setDateActive] = useState(false);
  const scrollContainer = useScrollContainer();
  const isMobile = useIsMobile();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const headingEl = headingRef.current;
    const dateEl = dateRef.current;

    const scrollElement = getScrollElement(scrollContainer, isMobile);

    const handleScroll = () => {
      const viewportHeight = getViewportHeight(scrollContainer, isMobile);

      if (headingEl) {
        const headingRect = headingEl.getBoundingClientRect();
        const headingTrigger =
          headingRect.top + headingRect.height * 0.5 <= viewportHeight * 0.8;
        setHeadingActive(headingTrigger);
      }

      if (dateEl) {
        const dateRect = dateEl.getBoundingClientRect();
        const dateTrigger =
          dateRect.top + dateRect.height * 0.5 <= viewportHeight * 0.8;
        setDateActive(dateTrigger);
      }
    };

    handleScroll();
    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [scrollContainer, isMobile]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Wedding date: August 22, 2026 at midnight Bali time (UTC+8)
      const weddingDate = new Date("2026-08-22T00:00:00+08:00").getTime();
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#ffedf3] text-[#233235] py-20 px-7 font-serif">
      <div className="max-w-4xl mx-auto text-center space-y-18">
        <div
          className={`transition-all duration-1500 ease-out ${
            headingActive
              ? "-translate-y-4 scale-100 opacity-100"
              : "scale-90 opacity-50"
          }`}
          ref={headingRef}
        >
          <h2 className="text-3xl">Save The Date</h2>
        </div>

        <div className={`space-y-6 transition-all duration-1000 ease-out ${
            dateActive
              ? "-translate-y-8 opacity-100"
              : "opacity-50"
          }`} ref={dateRef}>
          <div className="grid grid-cols-4 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/70 rounded-lg py-2 shadow-lg">
              <div className="text-lg font-bold text-[#535c4b] mb-2">
                {String(timeLeft.days).padStart(2, "0")}
              </div>
              <div className="text-xs font-medium">Days</div>
            </div>
            <div className="bg-white/70 rounded-lg py-2 shadow-lg">
              <div className="text-lg font-bold text-[#535c4b] mb-2">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="text-xs font-medium">Hours</div>
            </div>
            <div className="bg-white/70 rounded-lg py-2 shadow-lg">
              <div className="text-lg font-bold text-[#535c4b] mb-2">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="text-xs font-medium">Minutes</div>
            </div>
            <div className="bg-white/70 rounded-lg py-2 shadow-lg">
              <div className="text-lg font-bold text-[#535c4b] mb-2">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="text-xs font-medium">Seconds</div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xl font-serif">Saturday, August 22, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
