export default function EventDetailsPage() {
  return (
    <div className="w-full bg-[#ffedf3] text-[#233235] py-20 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif">
            Wedding Details
          </h2>
          <p className="text-base md:text-lg text-[#535c4b] max-w-2xl mx-auto">
            We would be honored to have you celebrate with us on our special day
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Ceremony */}
          <div className="bg-white/70 rounded-lg p-8 shadow-lg text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-serif font-bold">Ceremony</h3>
              <div className="w-20 h-0.5 bg-[#535c4b] mx-auto"></div>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-xl font-semibold">Friday</p>
                <p className="text-2xl font-bold text-[#535c4b]">22 / Aug / 2025</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-lg">3:00 PM - 4:00 PM</p>
              </div>
              
              <div className="space-y-1 pt-4">
                <p className="text-base font-medium">Venue Name</p>
                <p className="text-sm text-[#535c4b]">
                  123 Wedding Lane
                  <br />
                  City, State 12345
                </p>
              </div>
              
              <a
                href="#"
                className="inline-block mt-4 px-6 py-2 bg-[#535c4b] text-white rounded-full hover:bg-[#233235] transition-colors text-sm"
              >
                View on Map
              </a>
            </div>
          </div>

          {/* Reception */}
          <div className="bg-white/70 rounded-lg p-8 shadow-lg text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-serif font-bold">Reception</h3>
              <div className="w-20 h-0.5 bg-[#535c4b] mx-auto"></div>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-xl font-semibold">Friday</p>
                <p className="text-2xl font-bold text-[#535c4b]">22 / Aug / 2025</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-lg">5:00 PM - 10:00 PM</p>
              </div>
              
              <div className="space-y-1 pt-4">
                <p className="text-base font-medium">Venue Name</p>
                <p className="text-sm text-[#535c4b]">
                  123 Wedding Lane
                  <br />
                  City, State 12345
                </p>
              </div>
              
              <a
                href="#"
                className="inline-block mt-4 px-6 py-2 bg-[#535c4b] text-white rounded-full hover:bg-[#233235] transition-colors text-sm"
              >
                View on Map
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

