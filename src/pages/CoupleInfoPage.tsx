import { useEffect, useRef, useState } from "react";
import {
  useScrollContainer,
  useIsMobile,
  getScrollElement,
  getViewportHeight,
} from "../contexts/ScrollContext";

export default function CoupleInfoPage() {
  const headingRef = useRef<HTMLDivElement | null>(null);
  const brideImageRef = useRef<HTMLDivElement | null>(null);
  const brideTextRef = useRef<HTMLDivElement | null>(null);
  const groomImageRef = useRef<HTMLDivElement | null>(null);
  const groomTextRef = useRef<HTMLDivElement | null>(null);
  const [headingActive, setHeadingActive] = useState(false);
  const [brideImageActive, setBrideImageActive] = useState(false);
  const [brideTextActive, setBrideTextActive] = useState(false);
  const [groomImageActive, setGroomImageActive] = useState(false);
  const [groomTextActive, setGroomTextActive] = useState(false);
  const scrollContainer = useScrollContainer();
  const isMobile = useIsMobile();

  useEffect(() => {
    const headingEl = headingRef.current;
    const brideImgEl = brideImageRef.current;
    const brideTxtEl = brideTextRef.current;
    const groomImgEl = groomImageRef.current;
    const groomTxtEl = groomTextRef.current;

    const scrollElement = getScrollElement(scrollContainer, isMobile);

    const handleScroll = () => {
      const viewportHeight = getViewportHeight(scrollContainer, isMobile);

      if (headingEl) {
        const headingRect = headingEl.getBoundingClientRect();
        const headingTrigger =
          headingRect.top + headingRect.height * 0.5 <= viewportHeight * 0.8;
        setHeadingActive(headingTrigger);
      }

      // Bride image animates earlier (80% viewport)
      if (brideImgEl) {
        const brideImgRect = brideImgEl.getBoundingClientRect();
        const brideImgTrigger =
          brideImgRect.top + brideImgRect.height * 0.5 <= viewportHeight * 0.8;
        setBrideImageActive(brideImgTrigger);
      }

      // Bride text animates later (90% viewport)
      if (brideTxtEl) {
        const brideTxtRect = brideTxtEl.getBoundingClientRect();
        const brideTxtTrigger = brideTxtRect.top <= viewportHeight * 0.9;
        setBrideTextActive(brideTxtTrigger);
      }

      // Groom image animates earlier (80% viewport)
      if (groomImgEl) {
        const groomImgRect = groomImgEl.getBoundingClientRect();
        const groomImgTrigger =
          groomImgRect.top + groomImgRect.height * 0.5 <= viewportHeight * 0.8;
        setGroomImageActive(groomImgTrigger);
      }

      // Groom text animates later (90% viewport)
      if (groomTxtEl) {
        const groomTxtRect = groomTxtEl.getBoundingClientRect();
        const groomTxtTrigger = groomTxtRect.top <= viewportHeight * 0.9;
        setGroomTextActive(groomTxtTrigger);
      }
    };

    handleScroll();
    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [scrollContainer, isMobile]);

  return (
    <div className="relative w-full text-[#233235] py-10 px-5 font-serif">
      <div
        className="max-w-5xl mx-auto text-center space-y-16 bg-white/90 border-6 border-white rounded-3xl shadow-lg p-6 pb-10 pt-20 relative z-0"
        style={{ boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.15)" }}
      >
        <div
          ref={headingRef}
          className={` space-y-4 text-3xl transition-all duration-1500 ease-out ${
            headingActive
              ? "-translate-y-4 scale-100 opacity-100"
              : "scale-90 opacity-50"
          }`}
        >
          <h2 className="text-3xl">We Are Getting Married!</h2>
          <p className="text-base text-[#797979] max-w-2xl mx-auto italic">
            "Two souls, one heart. Two lives, one path. Two people, one love."
          </p>
        </div>

        <div>
          {/* Bride */}
          <div className="space-y-6">
            <div
              ref={brideImageRef}
              className={`relative w-50 h-60 mx-auto rounded-t-full rounded-b-full overflow-hidden shadow-xl transition-all duration-1500 ease-out ${
                brideImageActive
                  ? "-translate-y-4 scale-100 opacity-100"
                  : "scale-95 opacity-80"
              }`}
            >
              <img
                src="https://res.cloudinary.com/dvlbwxug3/image/upload/v1765443914/landing-hero_hv0ehr.jpg"
                alt="Victoria"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              ref={brideTextRef}
              className={`space-y-2 transition-all duration-1500 ease-out ${
                brideTextActive
                  ? "-translate-y-4 scale-100 opacity-100"
                  : "-translate-y-12 scale-90 opacity-50"
              }`}
            >
              <h3 className="text-2xl font-serif font-bold">Victoria</h3>
              <p className="text-sm">
                Daughter of
                <br />
                Father & Mother
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="text-5xl pt-8 pb-15 font-serif text-[#535c4b]">&</div>

          {/* Groom */}
          <div className="space-y-6">
            <div
              ref={groomImageRef}
              className={`relative w-50 h-65 mx-auto rounded-t-full rounded-b-full overflow-hidden shadow-xl transition-all duration-1500 ease-out ${
                groomImageActive
                  ? "-translate-y-4 scale-100 opacity-100"
                  : "scale-95 opacity-80"
              }`}
            >
              <img
                src="https://res.cloudinary.com/dvlbwxug3/image/upload/v1765443914/landing-hero_hv0ehr.jpg"
                alt="Nathanael"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              ref={groomTextRef}
              className={`space-y-2 transition-all duration-1500 ease-out ${
                groomTextActive
                  ? "-translate-y-4 scale-100 opacity-100"
                  : "-translate-y-12 scale-90 opacity-50"
              }`}
            >
              <h3 className="text-2xl font-serif font-bold">Nathanael</h3>
              <p className="text-sm">
                Son of
                <br />
                Father & Mother
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
