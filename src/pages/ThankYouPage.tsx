export default function ThankYouPage() {
  return (
    <div className="w-full  text-[#233235]">

<div
      className="text-[#233235] px-5 py-10 flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dvlbwxug3/image/upload/v1766491699/background_3_cuqtmj.png')",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <div className="max-w-3xl mx-auto text-center space-y-12 bg-white/90 border-5 border-white rounded-2xl px-5 py-15"
       style={{ boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.15)" }}
      >
        <div className="space-y-6">
          <h2 className="text-3xl font-serif">
            Thank You
          </h2>
          <p className="text-md text-[#535c4b] max-w-2xl mx-auto italic">
            It would mean the world to us to have you celebrate this special day
            together
          </p>
        </div>

        <div className="space-y-4 pt-8  border-t border-[#535c4b]/20">
          <p className="text-lg font-serif">With Love,</p>
          <div className="text-xl font-serif font-semibold text-[#535c4b]">
            Nathanael & Victoria
          </div>
        </div>

      </div>
    </div>
    </div>
  );
}
