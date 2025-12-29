export default function EventDetailsPage() {
  return (
    <div className="w-full bg-[#ffedf3] text-[#233235] pb-20 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ceremony */}
          <div
            className="rounded-2xl p-4 relative overflow-hidden"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dvlbwxug3/image/upload/v1766581417/background_4_dozyxo.png)`,
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
                <h3 className="text-2xl md:text-3xl font-serif font-bold">
                  Ceremony
                </h3>
                <div className="w-20 h-0.5 bg-[#535c4b] mx-auto"></div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xl font-semibold">Friday</p>
                  <p className="text-2xl font-bold text-[#535c4b]">
                    22 / Aug / 2025
                  </p>
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
              </div>
            </div>
          </div>

          {/* Reception */}
          <div
            className="rounded-2xl p-4 relative overflow-hidden"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dvlbwxug3/image/upload/v1766581417/background_4_dozyxo.png)`,
              backgroundSize: "cover",
              backgroundPosition: "top",
              backgroundRepeat: "no-repeat",
            }}
          >
 <div
              className="bg-white/90 rounded-2xl border-white border-5 p-8 shadow-lg text-center space-y-6"
              style={{ boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.15)" }}
            >              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-serif font-bold">
                  Reception
                </h3>
                <div className="w-20 h-0.5 bg-[#535c4b] mx-auto"></div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xl font-semibold">Friday</p>
                  <p className="text-2xl font-bold text-[#535c4b]">
                    22 / Aug / 2025
                  </p>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
