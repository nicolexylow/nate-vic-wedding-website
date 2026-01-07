import { Volume2, VolumeX } from "lucide-react";


export function MusicToggle({
    playing,
    toggleMusic,
  }: {
    playing: boolean;
    toggleMusic: () => void;
  }) {
  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-5 right-5 z-50 rounded-full p-3 text-sm bg-black/30 backdrop-blur-md text-white hover:bg-black/40"
      aria-pressed={playing}
    >
      {playing ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
}
