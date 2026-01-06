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
    <div className="w-full bg-[#ffedf3] text-[#2a2a2a] py-8 px-6">
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
              backgroundImage:
                "url('https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/background+(4).png')",
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
                  Welcome Dinner
                </h3>
                <div className="w-20 h-0.5 mx-auto"></div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xl">Friday</p>
                  <p className="text-xl font-bold text-[#535c4b]">
                    21 August 2026
                  </p>
                </div>

                <div className="space-y-3 text-sm py-2">
                  <p>
                    The welcome dinner is all about kicking things off with good
                    food, great company, and a relaxed evening together.
                  </p>
                  <p>
                    It’s the perfect chance to settle in, mingle, and start
                    celebrating before the big day ahead.
                  </p>
                </div>

                <div className="space-y-1 pt-4">
                  <button
                    className="rounded-full py-2 px-10 bg-[#ffe4e6]"
                    onClick={() => {
                      window.open(
                        "https://maps.app.goo.gl/fRCy8UgW6tQ79yiT7",
                        "_blank"
                      );
                    }}
                  >
                    Location
                  </button>
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
              backgroundImage:
                "url('https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/background+(4).png')",
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
                <h3 className="text-2xl font-serif font-bold">After Party</h3>
                <div className="w-20 h-0.5 mx-auto"></div>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xl">Saturday</p>
                  <p className="text-xl font-bold text-[#535c4b]">
                    23 August 2026
                  </p>
                </div>

                <div className="space-y-5 py-2 pt-4">
                  <div className=" border-b border-gray-300 pb-5">
                    <p className="font-semibold">Ceremony</p>
                    <p className="pt-2 text-sm">
                      Our wedding ceremony will take place at Tirtha Uluwatu.
                      The ceremony will be held indoors.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold">Reception</p>
                    <p className="text-sm pt-2">
                      Following the ceremony, guests are invited to continue the
                      celebration at{" "}
                      <span className="font-semibold">
                        Glasshouse by Tirtha
                      </span>{" "}
                      for cocktails, dinner, and dancing. There will be a
                      shuttle service provided on the day to transport guests
                      between locations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Last */}
          <div
            className={`rounded-2xl p-4 relative overflow-hidden transition-all duration-1500 ease-out ${
              ceremonyActive
                ? "-translate-y-15 scale-100 opacity-100"
                : "-translate-y-12 scale-90 opacity-50"
            }`}
            style={{
              backgroundImage:
                "url('https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/background+(4).png')",
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
                  Welcome Dinner
                </h3>
                <div className="w-20 h-0.5 mx-auto"></div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xl">Sunday</p>
                  <p className="text-xl font-bold text-[#535c4b]">
                    23 August 2026
                  </p>
                </div>

                <div className="space-y-4 py-2">
                  <p className="border-b text-sm  border-gray-300 pb-5">
                    Let’s end the weekend the way Bali does best — relaxed,
                    vibrant, and full of good vibes. Join us for the afterparty
                    to soak up the atmosphere, enjoy great music, and spend a
                    little more time together before we say goodbye. Please join
                    us at{" "}
                    <span className="font-semibold">
                      White Rock Beach Club, Uluwatu
                    </span>
                    .
                  </p>

                  <div className="space-y-5">
                    <p className="italic text-sm">
                      <span className="font-semibold">Please note:</span> Guests
                      wishing to attend are required to book in advance online,
                      as capacity is limited.
                    </p>

                    <button
                      className="rounded-full text-md py-2 px-10 bg-[#ffe4e6]"
                      onClick={() => {
                        window.open(
                          "https://whiterockbali.com/",
                          "_blank"
                        );
                      }}
                    >
                      Booking Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
