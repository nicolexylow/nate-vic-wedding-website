import { useEffect, useRef, useState } from "react";
import {
  useScrollContainer,
  useIsMobile,
  getScrollElement,
  getViewportHeight,
} from "../contexts/ScrollContext";

export default function DressCodePage() {
  const headingRef = useRef<HTMLDivElement | null>(null);
  const paletteRef = useRef<HTMLDivElement | null>(null);
  const ladiesRef = useRef<HTMLDivElement | null>(null);
  const ladiesTextRef = useRef<HTMLDivElement | null>(null);
  const gentsRef = useRef<HTMLDivElement | null>(null);
  const gentsTextRef = useRef<HTMLDivElement | null>(null);
  const [headingActive, setHeadingActive] = useState(false);
  const [paletteActive, setPaletteActive] = useState(false);
  const [ladiesActive, setLadiesActive] = useState(false);
  const [ladiesTextActive, setLadiesTextActive] = useState(false);
  const [gentsActive, setGentsActive] = useState(false);
  const [gentsTextActive, setGentsTextActive] = useState(false);
  const scrollContainer = useScrollContainer();
  const isMobile = useIsMobile();

  // Color palette swatches based on the image
  const colorPalette = [
    "#8B6F5E", // muted reddish-brown/taupe
    "#D4C4A8", // light beige/tan
    "#F5F1E8", // cream/off-white
    "#A8B5A0", // light olive green/sage
    "#C97D5C", // terracotta/burnt orange
    "#F9F7F2", // very light cream/almost white
  ];

  useEffect(() => {
    const headingEl = headingRef.current;
    const paletteEl = paletteRef.current;
    const ladiesEl = ladiesRef.current;
    const ladiesTextEl = ladiesTextRef.current;
    const gentsEl = gentsRef.current;
    const gentsTextEl = gentsTextRef.current;

    const scrollElement = getScrollElement(scrollContainer, isMobile);

    const handleScroll = () => {
      const viewportHeight = getViewportHeight(scrollContainer, isMobile);

      if (headingEl) {
        const headingRect = headingEl.getBoundingClientRect();
        const headingTrigger = headingRect.top <= viewportHeight * 0.9;
        setHeadingActive(headingTrigger);
      }

      if (paletteEl) {
        const paletteRect = paletteEl.getBoundingClientRect();
        const paletteTrigger = paletteRect.top <= viewportHeight * 0.9;
        setPaletteActive(paletteTrigger);
      }

      if (ladiesEl) {
        const ladiesRect = ladiesEl.getBoundingClientRect();
        const ladiesTrigger = ladiesRect.top <= viewportHeight * 0.7;
        setLadiesActive(ladiesTrigger);
      }

      if (ladiesTextEl) {
        const ladiesTextRect = ladiesTextEl.getBoundingClientRect();
        const ladiesTextTrigger = ladiesTextRect.top <= viewportHeight * 0.9;
        setLadiesTextActive(ladiesTextTrigger);
      }

      if (gentsEl) {
        const gentsRect = gentsEl.getBoundingClientRect();
        const gentsTrigger = gentsRect.top <= viewportHeight * 0.7;
        setGentsActive(gentsTrigger);
      }

      if (gentsTextEl) {
        const gentsTextRect = gentsTextEl.getBoundingClientRect();
        const gentsTextTrigger = gentsTextRect.top <= viewportHeight * 0.9;
        setGentsTextActive(gentsTextTrigger);
      }
    };

    handleScroll();
    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [scrollContainer, isMobile]);

  return (
    <div className="w-full text-[#2a2a2a] py-15 px-6">
      <div
        className="max-w-6xl mx-auto space-y-16 bg-white/90 border-6 border-white px-5 py-8 rounded-2xl"
        style={{ boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.15)" }}
      >
        {/* Title */}
        <div
          className={`text-center transition-all duration-1000 ease-out pt-10 space-y-10 ${
            headingActive
              ? "-translate-y-4 scale-100 opacity-100"
              : "scale-90 opacity-50"
          }`}
          ref={headingRef}
        >
          <h2 className="text-3xl font-serif ">Dress Code</h2>

          <div className="space-y-3">
          <p>Step into our enchanted forest in style. We invite you to embrace formal attire with a touch of whimsy. Think flowing fabrics, soft florals, earthy tones, and a hint of sparkle. </p>
          <p>Please note that parts of the celebration will be outdoors, so choose comfortable footwear.

          </p>
        </div>
        </div>

        

        {/* Color Palette */}
        <div
          className={`text-center transition-all duration-1500 ease-out ${
            paletteActive
              ? "-translate-y-6 scale-100 opacity-100"
              : "scale-90 opacity-50"
          }`}
          ref={paletteRef}
        >
          <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
            {colorPalette.map((color, index) => (
              <div
                key={index}
                className="w-16 h-16 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Ladies Section */}
        <div className="space-y-10">
          <div
            className={`text-center space-y-3 transition-all duration-1500 ease-out mt-10 ${
              ladiesActive
                ? "-translate-y-4 scale-100 opacity-100"
                : "scale-90 opacity-50"
            }`}
            ref={ladiesRef}
          >
            <h3 className="text-xl font-serif font-semibold text-center">Ladies</h3>

            <p>
            We adore dreamy gowns and evening gowns in pastel hues.

            </p>

            <img
              src="https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/hero.jpg"
              className=" aspect-square h-full w-full object-cover object-center rounded-2xl"
            />
          </div>

          <div
            className={`text-center space-y-3 transition-all duration-1500 ease-out ${
              ladiesTextActive
                ? "-translate-y-8 scale-100 opacity-100"
                : "opacity-50"
            }`}
            ref={ladiesTextRef}
          >
            
          </div>
        </div>

        {/* Gents Section */}
        <div className="space-y-10">
          <div
            className={`text-center space-y-3 transition-all duration-1500 ease-out mt-10 ${
              gentsActive
                ? "-translate-y-4 scale-100 opacity-100"
                : "scale-90 opacity-50"
            }`}
            ref={gentsRef}
          >
            <h3 className="text-xl font-serif font-semibold text-center">Gentlemen</h3>
            <p>
            Lightweight suits or dress shirts with tailored trousers are perfect for Bali’s tropical warmth. 
            </p>

            <img
              src="https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/hero.jpg"
              className=" aspect-square h-full w-full object-cover object-center rounded-2xl"
            />
          </div>

          <div
            className={`text-center space-y-3 transition-all duration-1500 ease-out ${
              gentsTextActive
                ? "-translate-y-8 scale-100 opacity-100"
                : "opacity-50"
            }`}
            ref={gentsTextRef}
          >
            
          </div>
        </div>
      </div>
    </div>
  );
}
