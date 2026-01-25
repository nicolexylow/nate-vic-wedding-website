import { useRef, useState, useEffect, useCallback } from "react";
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
import { Pause, Play } from "lucide-react";
import { MusicToggle } from "./components/MusicToggle";

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [allowScroll, setAllowScroll] = useState(false);

  const SLIDES = [
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T064303Z-3-001/DSC01859.jpg",
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T064303Z-3-001/DSC09046.jpg",
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T064303Z-3-001/DSC09158.jpg",
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T064303Z-3-001/DSC09188.jpg",
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T064303Z-3-001/DSC09441.jpg",
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T064303Z-3-001/DSC09520.jpg",
  ];

  const [slideIndex, setSlideIndex] = useState(0);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    el.style.overflowY = allowScroll ? "auto" : "hidden";
  }, [allowScroll]);

  useEffect(() => {
    if (paused || SLIDES.length <= 1) return;

    const id = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % SLIDES.length);
    }, 8000);

    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => {
    const a = new Audio(
      "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/wanderlust-justin-lee-main-version-29117-01-40.mp3"
    );
    a.loop = true;
    a.volume = 0.35;
    audioRef.current = a;

    const onPlay = () => setMusicPlaying(true);
    const onPause = () => setMusicPlaying(false);

    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);

    return () => {
      a.pause();
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      audioRef.current = null;
    };
  }, []);

  const startMusic = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;

    // ✅ if already playing, do nothing
    if (!a.paused) {
      setMusicPlaying(true);
      return;
    }

    try {
      await a.play();
      setMusicPlaying(true);
    } catch (e) {
      console.error("Music blocked:", e);
    }
  }, []);

  const toggleMusic = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;

    if (musicPlaying) {
      a.pause();
      setMusicPlaying(false);
      return;
    }

    try {
      await a.play();
      setMusicPlaying(true);
    } catch (e) {
      console.error("Music blocked:", e);
    }
  }, [musicPlaying]);

  return (
    <ScrollContext.Provider
      value={{
        scrollContainer: scrollContainerRef,
        allowScroll,
        setAllowScroll,
      }}
    >
      <div className="sm:flex sm:h-screen sm:overflow-hidden">
        {/* Static Image on Left - Only visible on md and above */}
        <div className="hidden relative md:block md:flex-1 md:h-screen md:shrink-0 overflow-hidden">
          {/* Slideshow images (crossfade) */}
          {SLIDES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="Nathanael and Victoria"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                i === slideIndex ? "opacity-100" : "opacity-0"
              }`}
              draggable={false}
            />
          ))}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Text overlay */}
          <div className="absolute inset-0 z-10 flex items-center justify-center flex-col gap-3 text-white px-3">
            <p className="text-shadow-lg text-2xl italic">The Wedding of</p>
            <h1 className="text-6xl italic text-shadow-lg font-['Kapakana']">
              Nathanael & Victoria
            </h1>
            <h2 className="text-lg text-shadow-lg font-sans">22 Aug 2026</h2>
          </div>

          {/* STOP / PLAY BUTTON */}
          {!galleryModalOpen && (
            <button
              onClick={() => setPaused((p) => !p)}
              className="
      absolute bottom-5 left-5 z-20
      rounded-full px-5 py-3
      bg-black/30 backdrop-blur-md
      text-white hover:bg-black/40
      transition
    "
            >
              {paused ? (
                <div className="flex gap-2 items-center">
                  <Play size={15} />
                  <p>Play slideshow</p>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <Pause size={15} />
                  <p>Pause slideshow</p>
                </div>
              )}
            </button>
          )}
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
            <LandingPage startMusic={startMusic} />
            <IntroPage />
            <CoupleInfoPage />
            <SaveTheDatePage />
            <EventDetailsPage />
            <DressCodePage />
            <FAQPage />
            <GalleryPage setGalleryModalOpen={setGalleryModalOpen} />
            <RSVPPage />
            <GiftRegistryPage />
            <ThankYouPage />
          </div>
        </div>
      </div>
      <MusicToggle playing={musicPlaying} toggleMusic={toggleMusic} />
    </ScrollContext.Provider>
  );
}

export default App;
