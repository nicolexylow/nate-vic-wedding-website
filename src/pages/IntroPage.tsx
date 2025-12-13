import { useEffect, useRef, useState } from "react";

export default function IntroPage() {
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
      const cardTrigger = cardRect.top <= window.innerHeight * 0.8;

      setImageActive(imageTrigger);
      setCardActive(cardTrigger);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#ffedf3] text-[#233235] px-12 flex items-center justify-center">

    <div className="mt-14 -mb-5">
      <div
        ref={imageRef}
        className={`w-full aspect-square overflow-hidden rounded-2xl relative z-20 transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(0,0,0,0.2)] ${
          imageActive
            ? "-translate-y-4 scale-100 opacity-100"
            : "scale-95 opacity-80"
        }`}
      >
        <img
          src="https://res.cloudinary.com/dvlbwxug3/image/upload/v1765443914/landing-hero_hv0ehr.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center block"
        />
      </div>
      <div
        ref={cardRef}
        className={`bg-white/50 p-5 rounded-2xl pt-18 space-y-5 transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(0,0,0,0.1)] relative ${
          cardActive
            ? "-translate-y-15 scale-100 opacity-100"
            : "-translate-y-12 scale-90 opacity-50"
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
    </div>
  );
}

