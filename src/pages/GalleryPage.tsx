import { useState } from "react";

export default function GalleryPage() {
  // Placeholder images - replace with actual wedding photos
  const images = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    src: `https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/hero.jpg`,
    alt: `Gallery image ${i + 1}`,
  }));

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="w-full text-[#2a2a2a] py-12 px-4">
      <div
        className="max-w-6xl mx-auto space-y-12 bg-white/90 border-6 border-white px-5 py-10 rounded-2xl"
        style={{ boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.15)" }}
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-serif">Our Gallery</h2>
          <p className="text-md text-[#535c4b]">
            Memories we've shared together
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => setSelectedImage(image.id)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Modal for full-size image */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
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
