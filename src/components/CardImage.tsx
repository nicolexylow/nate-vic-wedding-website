import { useEffect, useRef, useState } from "react";
import landingHero from "../assets/landing-hero.jpg";

export default function CardImage() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [imageActive, setImageActive] = useState(false);
  const [cardActive, setCardActive] = useState(false);

  useEffect(() => {
    const imgEl = imageRef.current;
    const cardEl = cardRef.current;
    if (!imgEl || !cardEl) return;

    const handleScroll = () => {
      const imgRect = imgEl.getBoundingClientRect();
      const cardRect = cardEl.getBoundingClientRect();

      // Image animates a bit earlier (80% viewport)
      const imageTrigger =
        imgRect.top + imgRect.height * 0.5 <= window.innerHeight * 0.8;
      // Card animates later (90% viewport)
      const cardTrigger = cardRect.top <= window.innerHeight * 0.7;

      setImageActive(imageTrigger);
      setCardActive(cardTrigger);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <div
        ref={imageRef}
        className={`w-full aspect-square overflow-hidden rounded-xl relative z-20 transition-transform duration-700 ease-out ${
          imageActive && "-translate-y-4 scale-105"
        }`}
      >
        <img src={landingHero} alt="" className="h-full w-full object-cover" />
      </div>
      <div
        ref={cardRef}
        className={`bg-white/50 p-5 rounded-xl pt-18 space-y-5 transition-transform duration-700 ease-out relative ${
          cardActive ? "-translate-y-15 scale-103" : "-translate-y-5"
        }`}
      >
        <h1 className="text-xl">Text here</h1>
        <p className="text-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h2 className="text-md">Text here</h2>
      </div>
    </div>
  );
}
