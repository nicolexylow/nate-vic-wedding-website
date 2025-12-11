import { useEffect, useRef } from "react";
import type { RefObject } from "react";

type VideoPageProps = {
  invitationRef?: RefObject<HTMLDivElement | null>;
  shouldPlay: boolean; 
};

export default function VideoPage({ invitationRef, shouldPlay }: VideoPageProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!shouldPlay) return;

    const id = setTimeout(() => {
      videoRef.current?.play().catch(() => {
        /* optionally handle blocked autoplay */
      });
    }, 800);
    return () => clearTimeout(id);
  }, [shouldPlay]);

  return (
    <div ref={invitationRef} className="relative w-full h-screen overflow-hidden bg-white">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        muted
        playsInline
      >
        <source src="https://res.cloudinary.com/dvlbwxug3/video/upload/v1765448804/nate-vic-video_nd9eoo.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}