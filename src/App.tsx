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
        <div className="hidden relative sm:block sm:flex-1 sm:h-screen sm:shrink-0">
          <div className="absolute text-2xl font-serif text-white inset-0 flex items-center justify-center flex-col gap-3">
            <p className="text-shadow-lg text-xl">The Wedding of</p>
            <h1 className="text-2xl italic text-shadow-lg">Nathanael & Victoria</h1>
          </div>
          <img
            src="https://res.cloudinary.com/dvlbwxug3/image/upload/v1765443914/landing-hero_hv0ehr.jpg"
            alt="Nathanael and Victoria"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Area - Full width on mobile, fixed width on right for sm+ */}
        <div
          ref={scrollContainerRef}
          className="relative w-full sm:w-[425px] sm:shrink-0 sm:h-dvh sm:overflow-y-auto"
        >
          {/* FIXED BACKGROUND (mobile = full screen, desktop = right column only) */}
          <div
            className="
              pointer-events-none
              fixed inset-0
              sm:left-auto sm:right-0 sm:top-0 sm:bottom-0 sm:w-[425px]
              z-0
              bg-[url('https://res.cloudinary.com/dvlbwxug3/image/upload/v1766581417/background_4_dozyxo.png')]
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
