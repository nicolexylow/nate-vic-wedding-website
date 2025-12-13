export default function LoveStoryPage() {
  const storyTimeline = [
    {
      year: "2020",
      title: "First Meeting",
      description: "We first met through mutual friends at a coffee shop. The connection was instant, and we knew something special was beginning.",
    },
    {
      year: "2021",
      title: "First Date",
      description: "Our first official date was a beautiful evening that sealed our fate. We talked for hours and realized we had found our person.",
    },
    {
      year: "2022",
      title: "Moving In Together",
      description: "We took the next step and moved in together, creating a home filled with love, laughter, and endless adventures.",
    },
    {
      year: "2023",
      title: "The Proposal",
      description: "Under a starlit sky, surrounded by our closest friends and family, we said yes to forever together.",
    },
    {
      year: "2024",
      title: "Wedding Planning",
      description: "We've been planning the perfect day to celebrate our love with all the people who matter most to us.",
    },
    {
      year: "2025",
      title: "Our Special Day",
      description: "This is where our forever begins. A new chapter filled with love, joy, and endless possibilities.",
    },
  ];

  return (
    <div className="w-full bg-white text-[#233235] py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif">
            Love Story
          </h2>
          <p className="text-base md:text-lg text-[#535c4b]">
            Our journey together
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#535c4b]/20 transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {storyTimeline.map((story, index) => (
              <div
                key={index}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-[#535c4b] rounded-full transform -translate-x-1/2 z-10"></div>

                {/* Content */}
                <div
                  className={`flex-1 ml-12 md:ml-0 ${
                    index % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                  }`}
                >
                  <div className="bg-[#ffedf3]/50 rounded-lg p-6 shadow-lg">
                    <div className="text-2xl font-bold text-[#535c4b] mb-2">
                      {story.year}
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-3">
                      {story.title}
                    </h3>
                    <p className="text-sm md:text-base text-[#233235]/80">
                      {story.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

