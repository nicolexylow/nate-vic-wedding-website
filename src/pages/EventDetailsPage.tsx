import { useEffect, useRef, useState } from "react";
import { sanityClient } from "../lib/sanity";
import {
  useScrollContainer,
  useIsMobile,
  getScrollElement,
  getViewportHeight,
} from "../contexts/ScrollContext";

type EventButton = {
  title?: string;
  url?: string;
};

type Event = {
  eventKey: "welcome-dinner" | "wedding-day" | "after-party";
  title?: string;
  day?: string;
  date?: string;
  description?: string[];
  button?: EventButton;
};

const query = `*[_type == "event" && eventKey in ["welcome-dinner","wedding-day","after-party"]]{
  eventKey,
  title,
  day,
  date,
  description,
  button
}`;

export default function EventDetailsPage() {
  const [event, setEvent] = useState<
    Partial<Record<Event["eventKey"], Event>>
  >({});
  const bachelorRef = useRef<HTMLDivElement | null>(null);
  const ceremonyRef = useRef<HTMLDivElement | null>(null);
  const receptionRef = useRef<HTMLDivElement | null>(null);
  const thirdRef = useRef<HTMLDivElement | null>(null);
  const [bachelorActive, setBachelorActive] = useState(false);
  const [ceremonyActive, setCeremonyActive] = useState(false);
  const [receptionActive, setReceptionActive] = useState(false);
  const [thirdActive, setThirdActive] = useState(false);
  const scrollContainer = useScrollContainer();
  const isMobile = useIsMobile();

  const welcome = event["welcome-dinner"];
  const wedding = event["wedding-day"];
  const after = event["after-party"];

  useEffect(() => {
    sanityClient.fetch<Event[]>(query).then((docs) => {
      const map: Partial<Record<Event["eventKey"], Event>> = {};
      docs.forEach((d) => (map[d.eventKey] = d));
      setEvent(map);
    });
  }, []);

  useEffect(() => {
    const bachelorEl = bachelorRef.current;
    const ceremonyEl = ceremonyRef.current;
    const receptionEl = receptionRef.current;
    const thirdEl = thirdRef.current;
    if (!bachelorEl || !ceremonyEl || !receptionEl || !thirdEl) return;

    const scrollElement = getScrollElement(scrollContainer, isMobile);

    const handleScroll = () => {
      const bachelorRect = bachelorEl.getBoundingClientRect();
      const ceremonyRect = ceremonyEl.getBoundingClientRect();
      const receptionRect = receptionEl.getBoundingClientRect();
      const thirdRect = thirdEl.getBoundingClientRect();
      const viewportHeight = getViewportHeight(scrollContainer, isMobile);

      // Cards animate when they reach 80% of viewport
      const bachelorTrigger = bachelorRect.top <= viewportHeight * 0.8;
      const ceremonyTrigger = ceremonyRect.top <= viewportHeight * 0.8;
      const receptionTrigger = receptionRect.top <= viewportHeight * 0.8;
      const thirdTrigger = thirdRect.top <= viewportHeight * 0.8;

      setBachelorActive(bachelorTrigger);
      setCeremonyActive(ceremonyTrigger);
      setReceptionActive(receptionTrigger);
      setThirdActive(thirdTrigger);
    };

    handleScroll();
    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [scrollContainer, isMobile]);

  return (
    <div className="w-full bg-[#ffedf3] text-[#2a2a2a] py-8 px-6">
      <div className="max-w-5xl mx-auto space-y-16 font-serif">
        <div className="grid gap-8">
          {/* Ceremony */}
          <div
            ref={bachelorRef}
            className={`rounded-2xl p-4 relative overflow-hidden transition-all duration-1500 ease-out ${bachelorActive
              ? "-translate-y-15 scale-100 opacity-100"
              : "-translate-y-12 scale-90 opacity-50"
              }`}
            style={{
              backgroundImage:
                "url('https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/background+(4).png')",
              backgroundSize: "cover",
              backgroundPosition: "top",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="bg-white/90 rounded-2xl border-white border-5 p-8 shadow-lg text-center space-y-6"
              style={{ boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.15)" }}
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold">
                  {welcome?.title ?? "Bachelor/Bachelorette Celebrations"}
                </h3>
                <div className="w-20 h-0.5 mx-auto"></div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xl">Wednesday</p>
                  <p className="text-xl font-bold text-[#535c4b]">
                    19 August 2026
                  </p>
                </div>

                <div className="space-y-3 text-sm py-2">
                  <p>
                    Nathanael and Victoria will be holding their respective Bachelor and Bachelorette celebrations.

                  </p>
                  <p>
                    All are welcome to join in the celebrations! More details will be shared at a later date by the Best Man and Maid of Honour.
                  </p>
                  <p>
                    If you would like to attend, please be sure to RSVP, so we can send out invitations and plan the events accordingly.
                  </p>
                  <p>
                    We hope you can celebrate with us!
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Ceremony */}
          <div
            ref={ceremonyRef}
            className={`rounded-2xl p-4 relative overflow-hidden transition-all duration-1500 ease-out ${ceremonyActive
              ? "-translate-y-15 scale-100 opacity-100"
              : "-translate-y-12 scale-90 opacity-50"
              }`}
            style={{
              backgroundImage:
                "url('https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/background+(4).png')",
              backgroundSize: "cover",
              backgroundPosition: "top",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="bg-white/90 rounded-2xl border-white border-5 p-8 shadow-lg text-center space-y-6"
              style={{ boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.15)" }}
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold">
                  {welcome?.title ?? "Welcome Dinner"}
                </h3>
                <div className="w-20 h-0.5 mx-auto"></div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xl">Friday</p>
                  <p className="text-xl font-bold text-[#535c4b]">
                    21 August 2026
                  </p>
                </div>

                <div className="space-y-3 text-sm py-2">
                  <p>
                    The welcome dinner is all about kicking things off with good
                    food, great company, and a relaxed evening together.
                  </p>
                  <p>
                    It’s the perfect chance to settle in, mingle, and start
                    celebrating before the big day ahead.
                  </p>
                </div>

                <div className="space-y-1 pt-4">
                  <button
                    className="rounded-full py-2 px-10 bg-[#ffe4e6]"
                    onClick={() => {
                      window.open(
                        "https://maps.app.goo.gl/fRCy8UgW6tQ79yiT7",
                        "_blank"
                      );
                    }}
                  >
                    {welcome?.button?.title ?? "Location"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Reception */}
          <div
            ref={receptionRef}
            className={`rounded-2xl p-4 relative overflow-hidden transition-all duration-1000 ease-out ${receptionActive
              ? "-translate-y-15 scale-100 opacity-100"
              : "-translate-y-12 scale-90 opacity-50"
              }`}
            style={{
              backgroundImage:
                "url('https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/background+(4).png')",
              backgroundSize: "cover",
              backgroundPosition: "top",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="bg-white/90 rounded-2xl border-white border-5 p-8 shadow-lg text-center space-y-6"
              style={{ boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.15)" }}
            >
              {" "}
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold">{wedding?.title ?? "Wedding Day"}</h3>
                <div className="w-20 h-0.5 mx-auto"></div>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xl">Saturday</p>
                  <p className="text-xl font-bold text-[#535c4b]">
                    23 August 2026
                  </p>
                </div>

                <div className="space-y-5 py-2 pt-4">
                  <div className=" border-b border-gray-300 pb-5">
                    <p className="font-semibold">Ceremony</p>
                    <p className="pt-2 text-sm">
                      Our wedding ceremony will take place at Tirtha Uluwatu.
                      The ceremony will be held indoors.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold">Reception</p>
                    <p className="text-sm pt-2">
                      Following the ceremony, guests are invited to continue the
                      celebration at Glasshouse by Tirtha
                      for cocktails, dinner, and dancing.
                    </p>
                    <p className="text-sm pt-3">There will be a
                      shuttle service provided on the day to transport guests
                      between locations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Last */}
          <div
            ref={thirdRef}
            className={`rounded-2xl p-4 relative overflow-hidden transition-all duration-1500 ease-out ${thirdActive
              ? "-translate-y-15 scale-100 opacity-100"
              : "-translate-y-12 scale-90 opacity-50"
              }`}
            style={{
              backgroundImage:
                "url('https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/background+(4).png')",
              backgroundSize: "cover",
              backgroundPosition: "top",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="bg-white/90 rounded-2xl border-white border-5 p-8 shadow-lg text-center space-y-6"
              style={{ boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.15)" }}
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold">{after?.title ?? "After Party"}</h3>
                <div className="w-20 h-0.5 mx-auto"></div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xl">Sunday</p>
                  <p className="text-xl font-bold text-[#535c4b]">
                    23 August 2026
                  </p>
                </div>

                <div className="space-y-4 py-2">
                  <div className="border-b border-gray-300 pb-5">


                    <p className="text-sm">
                      Join us for the afterparty to soak up the atmosphere, enjoy great music, and spend a little more time together before we say goodbye.
                    </p>
                    <p className="text-sm pt-3">Please join us at White Rock Beach Club Uluwatu.</p>
                  </div>

                  <div className="space-y-5">
                    <p className="italic text-sm">
                      <span className="font-semibold">Please note:</span> Guests
                      wishing to attend are required to book in advance online,
                      as capacity is limited.
                    </p>

                    <button
                      className="rounded-full text-md py-2 px-10 bg-[#ffe4e6]"
                      onClick={() => {
                        window.open("https://whiterockbali.com/", "_blank");
                      }}
                    >
                      {after?.button?.title ?? "Booking Link"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
