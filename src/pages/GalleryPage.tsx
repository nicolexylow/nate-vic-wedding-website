import { useEffect, useMemo, useRef, useState } from "react";
import {
  useScrollContainer,
  useIsMobile,
  getScrollElement,
  getViewportHeight,
} from "../contexts/ScrollContext";
import DSC01516 from "../assets/gallery/DSC01516.jpg";
import DSC01533 from "../assets/gallery/DSC01533.jpg";
import DSC01702 from "../assets/gallery/DSC01702.jpg";
import DSC01716 from "../assets/gallery/DSC01716.jpg";
import DSC01726 from "../assets/gallery/DSC01726.jpg";
import DSC01746 from "../assets/gallery/DSC01746.jpg";
import DSC01781 from "../assets/gallery/DSC01781.jpg";
import DSC01808 from "../assets/gallery/DSC01808.jpg";
import DSC09015 from "../assets/gallery/DSC09015.jpg";
import DSC09269 from "../assets/gallery/DSC09269.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

type GalleryPageProps = {
  setGalleryModalOpen?: (open: boolean) => void;
};

export default function GalleryPage({ setGalleryModalOpen }: GalleryPageProps) {

  const SOURCE = [
    DSC01702,
    DSC01716,
    DSC01726,
    DSC01746,
    DSC01781,
    DSC01808,
    DSC09015,
    DSC09269,
    DSC01516,
    DSC01533,
  ]
  const images = SOURCE.map((source, i) => ({
    id: i + 1,
    src: source,
    alt: `Gallery image ${i + 1}`,
  }));

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // 🔥 tell parent whenever modal opens/closes
  useEffect(() => {
    setGalleryModalOpen?.(selectedImage !== null);
    return () => setGalleryModalOpen?.(false); // cleanup if unmount
  }, [selectedImage, setGalleryModalOpen]);

  // Navigation functions for modal
  const goToPrevious = () => {
    if (selectedImage && selectedImage > 1) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage && selectedImage < images.length) {
      setSelectedImage(selectedImage + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, images.length]);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [sectionActive, setSectionActive] = useState(false);

  const scrollContainer = useScrollContainer();
  const isMobile = useIsMobile();

  const [activeCards, setActiveCards] = useState<boolean[]>(
    () => new Array(images.length).fill(false)
  );

  const cardRefs = useMemo(
    () =>
      Array.from({ length: images.length }, () =>
        ({ current: null } as React.RefObject<HTMLDivElement | null>)
      ),
    []
  );

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const scrollElement = getScrollElement(scrollContainer, isMobile);

    const handleScroll = () => {
      const viewportHeight = getViewportHeight(scrollContainer, isMobile);

      if (sectionEl) {
        const rect = sectionEl.getBoundingClientRect();
        const trigger = rect.top <= viewportHeight * 0.8;
        setSectionActive(trigger);
      }

      setActiveCards((prev) => {
        const next = [...prev];
        for (let i = 0; i < cardRefs.length; i++) {
          const el = cardRefs[i].current;
          if (!el) continue;

          const r = el.getBoundingClientRect();
          const trigger = r.top <= viewportHeight * 0.8;
          if (trigger && !next[i]) next[i] = true;
        }
        return next;
      });
    };

    handleScroll();
    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [scrollContainer, isMobile, cardRefs]);

  return (
    <div className="w-full text-[#2a2a2a] py-12 px-4">
      <div
        className="max-w-6xl mx-auto space-y-12 bg-white/90 border-6 border-white px-5 pt-18 pb-3 rounded-2xl"
        style={{ boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.15)" }}
      >
        <div
          ref={sectionRef}
          className={`text-center space-y-4 pb-10 transition-all duration-1500 ease-out ${sectionActive
            ? "-translate-y-2 scale-100 opacity-100"
            : "scale-95 opacity-60"
            }`}
        >
          <h2 className="text-3xl font-serif">Our Gallery</h2>
          <p className="text-md text-[#535c4b]">
            Memories we've shared together
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {images.map((image, idx) => {
            const cardActive = activeCards[idx];

            return (
              <div
                key={image.id}
                ref={cardRefs[idx]}
                className={`aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all duration-1000 ease-out ${cardActive
                  ? "-translate-y-15 scale-100 opacity-100"
                  : "-translate-y-12 scale-90 opacity-50"
                  } hover:scale-105`}
                onClick={() => setSelectedImage(image.id)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selectedImage - 1].src}
                alt={images[selectedImage - 1].alt}
                className="max-w-full rounded-2xl max-h-[90vh] object-contain"
              />

              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white text-2xl w-10 h-10 flex items-center justify-center bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Close"
              >
                ×
              </button>

              {/* Previous button */}
              {selectedImage > 1 && (
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl w-12 h-12 flex items-center justify-center bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft />
                </button>
              )}

              {/* Next button */}
              {selectedImage < images.length && (
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl w-12 h-12 flex items-center justify-center bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight />
                </button>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 font-sans left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                {selectedImage} / {images.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
