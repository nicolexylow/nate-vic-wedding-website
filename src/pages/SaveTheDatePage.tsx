import { useEffect, useState } from "react";

export default function SaveTheDatePage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Wedding date: August 22, 2025
  const weddingDate = new Date("2025-08-22T00:00:00").getTime();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#ffedf3] text-[#233235] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif">
            Save The Date
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <div className="bg-white/70 rounded-lg p-6 shadow-lg">
            <div className="text-4xl md:text-5xl font-bold text-[#535c4b] mb-2">
              {String(timeLeft.days).padStart(2, "0")}
            </div>
            <div className="text-sm md:text-base font-medium">Days</div>
          </div>
          <div className="bg-white/70 rounded-lg p-6 shadow-lg">
            <div className="text-4xl md:text-5xl font-bold text-[#535c4b] mb-2">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div className="text-sm md:text-base font-medium">Hours</div>
          </div>
          <div className="bg-white/70 rounded-lg p-6 shadow-lg">
            <div className="text-4xl md:text-5xl font-bold text-[#535c4b] mb-2">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <div className="text-sm md:text-base font-medium">Minutes</div>
          </div>
          <div className="bg-white/70 rounded-lg p-6 shadow-lg">
            <div className="text-4xl md:text-5xl font-bold text-[#535c4b] mb-2">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <div className="text-sm md:text-base font-medium">Seconds</div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xl md:text-2xl font-serif">Friday, August 22, 2025</p>
          <p className="text-base md:text-lg text-[#535c4b]">
            We can't wait to celebrate with you!
          </p>
        </div>
      </div>
    </div>
  );
}

