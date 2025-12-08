import type { RefObject } from "react";

type VideoPageProps = {
  invitationRef?: RefObject<HTMLDivElement | null>;
};

export default function VideoPage({ invitationRef }: VideoPageProps) {
  return (
    <div
      ref={invitationRef}
      className="min-h-screen bg-white text-[#233235] px-6 py-16 flex items-center justify-center"
    >
      <div className="max-w-2xl text-center space-y-6">
        <p className="text-lg md:text-xl font-semibold">
          Animated video goes here
        </p>
      </div>
    </div>
  );
}
