import { useEffect, useMemo, useRef, useState } from "react";
import {
  useScrollContainer,
  useIsMobile,
  getScrollElement,
  getViewportHeight,
} from "../contexts/ScrollContext";

type GalleryPageProps = {
  setGalleryModalOpen?: (open: boolean) => void;
};

export default function GalleryPage({ setGalleryModalOpen }: GalleryPageProps) {

  const SOURCE = [
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T060817Z-3-001/DJI_0302.jpg",
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T060817Z-3-001/DSC01516.jpg",
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T060817Z-3-001/DSC01533.jpg",
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T060817Z-3-001/IMG_0315.jpg",
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T060817Z-3-001/IMG_1831.jpg",
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T060817Z-3-001/IMG_2834.jpg",
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T060817Z-3-001/IMG_3715.jpg",
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T060817Z-3-001/IMG_4634.jpg",
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T060817Z-3-001/IMG_6824.jpg",
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T060817Z-3-001/IMG_7024.jpg",
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T060817Z-3-001/IMG_7025+1.jpg",
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T060817Z-3-001/IMG_7151.jpg",
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T060817Z-3-001/IMG_7436.jpg",
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T060817Z-3-001/IMG_8485.jpg",
    "https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/drive-download-20260125T060817Z-3-001/IMG_9497.jpg"
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
          className={`text-center space-y-4 pb-10 transition-all duration-1500 ease-out ${
            sectionActive
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
                className={`aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all duration-1000 ease-out ${
                  cardActive
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
                className="max-w-full max-h-[90vh] object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white text-2xl w-10 h-10 flex items-center justify-center bg-black/50 rounded-full hover:bg-black/70"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
