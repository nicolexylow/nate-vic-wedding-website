import { useEffect, useRef, useState } from "react";
import {
  useScrollContainer,
  useIsMobile,
  getScrollElement,
  getViewportHeight,
} from "../contexts/ScrollContext";

export default function GiftRegistryPage() {
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [headingActive, setHeadingActive] = useState(false);
  const [cardActive, setCardActive] = useState(false);

  const scrollContainer = useScrollContainer();
  const isMobile = useIsMobile();

  useEffect(() => {
    const headingEl = headingRef.current;
    const cardEl = cardRef.current;

    const scrollElement = getScrollElement(scrollContainer, isMobile);

    let raf = 0;

    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const viewportHeight = getViewportHeight(scrollContainer, isMobile);

        // Heading block animates like DressCode title
        if (headingEl) {
          const rect = headingEl.getBoundingClientRect();
          const trigger = rect.top <= viewportHeight * 0.8;
          setHeadingActive(trigger);
        }

        // Whole card animates like Ladies section
        if (cardEl) {
          const rect = cardEl.getBoundingClientRect();

          // Resettable trigger: on when entering, off when sufficiently above
          const trigger =
            rect.top <= viewportHeight * 0.8;

          setCardActive(trigger);
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
    <div className="w-full text-[#2a2a2a] py-15 px-6">
      <div
        className="max-w-4xl mx-auto space-y-10 bg-white/90 border-6 border-white px-5 py-10 rounded-2xl"
        style={{ boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.15)" }}
      >
        <div
          ref={headingRef}
          className={`text-center transition-all duration-1000 ease-out space-y-4 pt-10 ${
            headingActive
              ? "-translate-y-4 scale-100 opacity-100"
              : "scale-90 opacity-50"
          }`}
        >
          <h2 className="text-3xl font-serif">Gift Registry</h2>

          <p className="text-md max-w-2xl mx-auto italic text-[#696969]">
            We’re so excited to celebrate with you — that’s the best gift we could
            ask for!
          </p>

          <p className="text-md max-w-2xl mx-auto italic text-[#696969]">
            For those who wish to honour us with a gift, we would greatly appreciate
            a contribution to our future home fund.
          </p>
        </div>

        <div className="grid gap-8">
          <div
            ref={cardRef}
            className={`bg-white border-4 border-red-50 rounded-2xl p-8 shadow-lg space-y-6 text-center transition-all duration-1500 ease-out ${
              cardActive
                ? "-translate-y-4 scale-100 opacity-100"
                : "scale-90 opacity-50"
            }`}
          >
            <h3 className="text-xl font-serif font-bold">Bank Transfer</h3>

            <div className="space-y-4">
              <div>
                <p className="text-lg mb-2">Commonwealth Bank</p>

                {/* This looked like an account number before — rename label if needed */}
                <p className="text-md font-bold text-[#535c4b]"><span className="font-medium">BSB:</span> 062948</p>
                <p className="text-md font-bold text-[#535c4b]"><span className="font-medium">Account No:</span> 14379255</p>

                <p className="text-md font-bold text-[#535c4b] mt-1">
                <span className="font-medium">Account Name:</span> Laurentius Mualim
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
