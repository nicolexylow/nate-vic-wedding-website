import { useEffect, useRef, useState } from "react";
import {
  useScrollContainer,
  useIsMobile,
  getScrollElement,
  getViewportHeight,
} from "../contexts/ScrollContext";
import DSC08924 from "../assets/DSC08924.jpg";

export default function IntroPage() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [imageActive, setImageActive] = useState(false);
  const [cardActive, setCardActive] = useState(false);
  const scrollContainer = useScrollContainer();
  const isMobile = useIsMobile();

  useEffect(() => {
    const imgEl = imageRef.current;
    const cardEl = cardRef.current;
    if (!imgEl || !cardEl) return;

    const scrollElement = getScrollElement(scrollContainer, isMobile);

    const handleScroll = () => {
      const imgRect = imgEl.getBoundingClientRect();
      const cardRect = cardEl.getBoundingClientRect();
      const viewportHeight = getViewportHeight(scrollContainer, isMobile);

      // Image animates a bit earlier (80% viewport)
      const imageTrigger =
        imgRect.top + imgRect.height * 0.5 <= viewportHeight * 0.8;
      // Card animates later (90% viewport)
      const cardTrigger = cardRect.top <= viewportHeight * 0.8;

      setImageActive(imageTrigger);
      setCardActive(cardTrigger);
    };

    handleScroll();
    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [scrollContainer, isMobile]);

  return (
    <div
      className="text-[#2a2a2a] px-5 flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/background+(3).png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mt-14 -mb-5 font-serif">
        <div className="mt-5"
        >
          <h2 className="text-2xl">We Are Getting Married!</h2>
          <p className="text-base text-[#696969] max-w-2xl mx-auto italic">
            "Two souls, one heart. Two lives, one path. Two people, one love."
          </p>
        </div>
        <div
          ref={imageRef}
          className={`w-full aspect-square overflow-hidden mt-12 rounded-2xl relative z-20 transition-all duration-1500 ease-out shadow-[0_0_20px_rgba(0,0,0,0.2)] ${imageActive
            ? "-translate-y-4 scale-100 opacity-100"
            : "scale-90 opacity-80"
            }`}
        >
          <img
            src={DSC08924}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center block"
          />
        </div>
        <div
          ref={cardRef}
          style={{ boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.15)" }}
          className={`bg-white/90 p-5 rounded-2xl pt-18 border-6 border-white space-y-5 transition-all duration-1500 ease-out shadow-[0_0_20px_rgba(0,0,0,0.1)] relative ${cardActive
            ? "-translate-y-15 opacity-100"
            : "-translate-y-5 opacity-50"
            }`}
        >
          <p className="text-sm">
          We can’t wait to celebrate our wedding. Having our closest friends and family travel from near and far to share this special moment means more to us than words can say. 
          </p>
          <p className="text-sm">This weekend is all about love, laughter, and creating memories together and we’re so grateful you’ll be part of it.</p>
          <div className="space-y-1 text-md font-semibold">
            <h1>Love,</h1>
            <h2 className="italic">Nathanael & Victoria</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
