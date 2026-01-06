import { useEffect, useRef, useState } from "react";
import {
  useScrollContainer,
  useIsMobile,
  getScrollElement,
  getViewportHeight,
} from "../contexts/ScrollContext";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQS: FAQItem[] = [
  {
    question: "When is the RSVP deadline?",
    answer:
      "Please RSVP by April 30th 2026, so we can have an accurate headcount.",
  },
  {
    question: "Can I bring a date?",
    answer:
      "We love that you want to share our day with someone special!\n\nTo help us plan, +1s are only invited if specifically mentioned on your invitation.\n\nIf you’re unsure, please reach out to us; we’re happy to clarify.",
  },
  {
    question: "Are kids welcome?",
    answer:
      "As much as we love your little ones, we will not be including them in the ceremony or reception.\n\nHowever, we recognise that some of you will be traveling with your kids, so please reach out to us personally!",
  },
  {
    question: "What will the weather be like?",
    answer:
      "Bali in August is warm and dry, with plenty of sunshine, low humidity, and temperatures around 26–30°C.",
  },
  {
    question: "Where should I park?",
    answer:
      "For now, we recommend taking an Uber, Lyft, or Grab to the ceremony, as Nathanael and I are still finalising shuttle bus arrangements.\n\nWe’ll share updates here if any transport options become available. Thank you for your flexibility!",
  },
  {
    question: "Is the wedding indoors or outdoors?",
    answer:
      "Our wedding ceremony is indoors but our reception will be a blend of indoor and outdoors!",
  },
  {
    question: "What should I wear?",
    answer:
      "Please see the dress code tab for information on what to wear. We are working to put together a mood board to make it easier!",
  },
  {
    question: "Is it okay to take pictures with our phones and cameras during the wedding?",
    answer:
      "No Phones, Please!\n\nWe can’t wait to celebrate with you! So put your phones away, immerse yourself in the moment, and enjoy the day!\n\nWe’ve got an amazing team of photographers, videographers, and a content creator to capture every special memory, so you can relax and be fully present.",
  },
  {
    question: "Whom should I call with questions?",
    answer:
      "If you have any questions about the wedding or travel, please don’t hesitate to call Nathanael or Victoria!\n\nWe’re happy to help with flights, accommodation, or anything in between to make your trip as smooth and memorable as possible.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 transition-transform duration-300 ${
        open ? "rotate-180" : "rotate-0"
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function FAQPage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [sectionActive, setSectionActive] = useState(false);

  const scrollContainer = useScrollContainer();
  const isMobile = useIsMobile();

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const scrollElement = getScrollElement(scrollContainer, isMobile);

    const handleScroll = () => {
      const viewportHeight = getViewportHeight(scrollContainer, isMobile);

      if (sectionEl) {
        const rect = sectionEl.getBoundingClientRect();
        const trigger = rect.top + rect.height * 0.15 <= viewportHeight * 0.85;
        setSectionActive(trigger);
      }
    };

    handleScroll();
    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [scrollContainer, isMobile]);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="w-full bg-[#ffedf3]/90 text-[#2a2a2a] py-15 px-7 font-serif">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Heading */}
        <div
          ref={sectionRef}
          className={`transition-all duration-1500 ease-out ${
            sectionActive
              ? "-translate-y-2 scale-100 opacity-100"
              : "scale-95 opacity-60"
          }`}
        >
          <h2 className="text-3xl">FAQ</h2>
          <p className="mt-3 text-sm opacity-80 italic">
            Everything you might need to know (and if it’s not here, just
            message us).
          </p>
        </div>

        {/* Accordion */}
        <div className="text-left space-y-3">
          {FAQS.map((item, idx) => {
            const open = openIndex === idx;

            return (
              <div
                key={item.question}
                className={`rounded-xl bg-white/70 shadow-lg border-3 border-white backdrop-blur-sm overflow-hidden transition-all duration-500 ${
                  sectionActive ? "opacity-100" : "opacity-70"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={open}
                >
                  <span className="text-sm sm:text-base font-semibold text-[#2a2a2a]">
                    {item.question}
                  </span>

                  <span className="shrink-0 text-[#535c4b]">
                    <ChevronIcon open={open} />
                  </span>
                </button>

                {/* Shopify-like: smooth height + fade */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                    open
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 text-sm leading-relaxed text-[#2a2a2a]/80 whitespace-pre-line">
                      {item.answer}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-black/5" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
