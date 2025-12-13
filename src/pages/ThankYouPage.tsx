export default function ThankYouPage() {
  return (
    <div className="w-full bg-white text-[#233235] py-20 px-6">
      <div className="max-w-3xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif">
            Thank You
          </h2>
          <p className="text-xl md:text-2xl text-[#535c4b] max-w-2xl mx-auto italic">
            It would mean the world to us to have you celebrate this special day together
          </p>
        </div>

        <div className="space-y-4 pt-8">
          <p className="text-lg md:text-xl font-serif">With Love,</p>
          <div className="text-3xl md:text-4xl font-serif font-bold text-[#535c4b]">
            Nathanael & Victoria
          </div>
        </div>

        <div className="pt-8 border-t border-[#535c4b]/20">
          <p className="text-sm text-[#535c4b]">
            Friday, August 22, 2025
          </p>
        </div>
      </div>
    </div>
  );
}

