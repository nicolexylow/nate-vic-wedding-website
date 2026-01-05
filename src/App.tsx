import { useRef, useState, useEffect } from "react";
import "./App.css";
import { ScrollContext } from "./contexts/ScrollContext";
import LandingPage from "./pages/LandingPage";
import IntroPage from "./pages/IntroPage";
import SaveTheDatePage from "./pages/SaveTheDatePage";
import CoupleInfoPage from "./pages/CoupleInfoPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import DressCodePage from "./pages/DressCodePage";
import GalleryPage from "./pages/GalleryPage";
import GiftRegistryPage from "./pages/GiftRegistryPage";
import RSVPPage from "./pages/RSVPPage";
import ThankYouPage from "./pages/ThankYouPage";
import FAQPage from "./pages/FAQPage";

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [allowScroll, setAllowScroll] = useState(false);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    el.style.overflowY = allowScroll ? "auto" : "hidden";
  }, [allowScroll]);

  return (
    <ScrollContext.Provider
      value={{
        scrollContainer: scrollContainerRef,
        allowScroll,
        setAllowScroll,
      }}
    >
      <div className="sm:flex sm:h-screen sm:overflow-hidden">
        {/* Static Image on Left - Only visible on sm and above */}
        <div className="hidden relative md:block md:flex-1 md:h-screen md:shrink-0">
          {/* Background image */}
          <img
            src="https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/DSC09046.jpg"
            alt="Nathanael and Victoria"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Text overlay */}
          <div className="absolute inset-0 z-10 flex items-center justify-center flex-col gap-3 text-white px-3">
            <p className="text-shadow-lg text-xl">The Wedding of</p>
            <h1 className="text-4xl italic text-shadow-lg">
              Nathanael & Victoria
            </h1>
            <h2 className="text-lg text-shadow-lg">22 Aug 2025</h2>
          </div>
        </div>

        {/* Content Area - Full width on mobile, fixed width on right for sm+ */}
        <div
          ref={scrollContainerRef}
          className="relative w-full sm:w-[450px] sm:shrink-0 sm:h-dvh sm:overflow-y-auto"
        >
          {/* FIXED BACKGROUND (mobile = full screen, desktop = right column only) */}
          <div
            className="
              pointer-events-none
              fixed inset-0
              sm:left-auto sm:right-0 sm:top-0 sm:bottom-0 sm:w-[450px]
              z-0
              bg-[url('https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/background+(4).png')]
              bg-no-repeat bg-top bg-cover
            "
          />

          {/* CONTENT */}
          <div className="relative z-10 min-h-dvh">
            <LandingPage />
            <IntroPage />
            <CoupleInfoPage />
            <SaveTheDatePage />
            <EventDetailsPage />
            <DressCodePage />
            <FAQPage />
            <GalleryPage />
            <RSVPPage />
            <GiftRegistryPage />
            <ThankYouPage />
          </div>
        </div>
      </div>
    </ScrollContext.Provider>
  );
}

export default App;
