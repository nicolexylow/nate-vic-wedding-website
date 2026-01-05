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
    question: "Where is the wedding taking place?",
    answer:
      "Our wedding will be held in Bali. The exact venue details and address will be shared closer to the date.",
  },
  {
    question: "What is the dress code?",
    answer:
      "We’ll be going for a semi-formal / cocktail vibe. Think elevated, comfortable, and wedding-ready (and Bali-friendly!).",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "If your invitation includes a plus one, it will be listed when you RSVP. If you’re unsure, feel free to message us.",
  },
  {
    question: "Are kids welcome?",
    answer:
      "We love your little ones, but this will be an adults-only celebration. Thank you for understanding.",
  },
  {
    question: "When should I RSVP by?",
    answer:
      "Please RSVP by the date shown on the RSVP page. This helps us finalise numbers, seating, and catering.",
  },
  {
    question: "Do you have a gift registry?",
    answer:
      "Your presence is the best gift. If you’d like to contribute, we’ll share a wishing well / registry option closer to the date.",
  },
  {
    question: "Any travel tips or accommodation recommendations?",
    answer:
      "Yes — we’ll share a short list of nearby accommodation options, plus transport tips, on the Travel page.",
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
    <div className="w-full bg-[#ffedf3]/90 text-[#233235] py-15 px-7 font-serif">
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
            Everything you might need to know (and if it’s not here, just message
            us).
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
                  <span className="text-sm sm:text-base font-semibold text-[#233235]">
                    {item.question}
                  </span>

                  <span className="shrink-0 text-[#535c4b]">
                    <ChevronIcon open={open} />
                  </span>
                </button>

                {/* Shopify-like: smooth height + fade */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 text-sm leading-relaxed text-[#233235]/80">
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
