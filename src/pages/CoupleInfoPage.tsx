import { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    const headingEl = headingRef.current;
    const brideImgEl = brideImageRef.current;
    const brideTxtEl = brideTextRef.current;
    const groomImgEl = groomImageRef.current;
    const groomTxtEl = groomTextRef.current;

    const handleScroll = () => {
      if (headingEl) {
        const headingRect = headingEl.getBoundingClientRect();
        const headingTrigger =
          headingRect.top + headingRect.height * 0.5 <=
          window.innerHeight * 0.8;
        setHeadingActive(headingTrigger);
      }

      // Bride image animates earlier (80% viewport)
      if (brideImgEl) {
        const brideImgRect = brideImgEl.getBoundingClientRect();
        const brideImgTrigger =
          brideImgRect.top + brideImgRect.height * 0.5 <=
          window.innerHeight * 0.8;
        setBrideImageActive(brideImgTrigger);
      }

      // Bride text animates later (90% viewport)
      if (brideTxtEl) {
        const brideTxtRect = brideTxtEl.getBoundingClientRect();
        const brideTxtTrigger = brideTxtRect.top <= window.innerHeight * 0.9;
        setBrideTextActive(brideTxtTrigger);
      }

      // Groom image animates earlier (80% viewport)
      if (groomImgEl) {
        const groomImgRect = groomImgEl.getBoundingClientRect();
        const groomImgTrigger =
          groomImgRect.top + groomImgRect.height * 0.5 <=
          window.innerHeight * 0.8;
        setGroomImageActive(groomImgTrigger);
      }

      // Groom text animates later (90% viewport)
      if (groomTxtEl) {
        const groomTxtRect = groomTxtEl.getBoundingClientRect();
        const groomTxtTrigger = groomTxtRect.top <= window.innerHeight * 0.9;
        setGroomTextActive(groomTxtTrigger);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full bg-[#faf8f3] text-[#233235] py-10 px-6">
      <div className="max-w-5xl mx-auto text-center space-y-16 bg-[#fefcf8] rounded-3xl shadow-lg p-8 pt-20 md:p-12">
        <div
          ref={headingRef}
          className={` space-y-4 text-3xl sm:text-4xl md:text-5xl font-serif transition-all duration-1000 ease-out ${
            headingActive
              ? "-translate-y-4 scale-100 opacity-100"
              : "scale-90 opacity-50"
          }`}
        >
          <h2>We Are Getting Married!</h2>
          <p className="text-base md:text-lg text-[#535c4b] max-w-2xl mx-auto italic">
            "Two souls, one heart. Two lives, one path. Two people, one love."
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bride */}
          <div className="space-y-6">
            <div
              ref={brideImageRef}
              className={`relative w-64 h-80 mx-auto rounded-t-full rounded-b-full overflow-hidden shadow-xl transition-all duration-1000 ease-out ${
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
              className={`space-y-2 transition-all duration-1000 ease-out ${
                brideTextActive
                  ? "-translate-y-4 scale-100 opacity-100"
                  : "-translate-y-12 scale-90 opacity-50"
              }`}
            >
              <h3 className="text-3xl md:text-4xl font-serif font-bold">
                Victoria
              </h3>
              <p className="text-lg text-[#535c4b]">Victoria</p>
              <p className="text-sm md:text-base">
                Daughter of
                <br />
                Father & Mother
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="text-5xl md:text-6xl font-serif text-[#535c4b]">
            &
          </div>

          {/* Groom */}
          <div className="space-y-6">
            <div
              ref={groomImageRef}
              className={`relative w-64 h-80 mx-auto rounded-t-full rounded-b-full overflow-hidden shadow-xl transition-all duration-1000 ease-out ${
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
              className={`space-y-2 transition-all duration-1000 ease-out ${
                groomTextActive
                  ? "-translate-y-4 scale-100 opacity-100"
                  : "-translate-y-12 scale-90 opacity-50"
              }`}
            >
              <h3 className="text-3xl md:text-4xl font-serif font-bold">
                Nathanael
              </h3>
              <p className="text-lg text-[#535c4b]">Nathanael</p>
              <p className="text-sm md:text-base">
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
