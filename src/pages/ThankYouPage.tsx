export default function ThankYouPage() {
  return (
    <div className="w-full  text-[#2a2a2a]">
      <div
        className="text-[#2a2a2a] px-5 py-10 flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://nathanael-victoria-2026-wedding-website.s3.ap-southeast-2.amazonaws.com/background+(3).png')",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <div
          className="max-w-3xl mx-auto text-center space-y-12 bg-white/90 border-5 border-white rounded-2xl px-5 py-15"
          style={{ boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.15)" }}
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-serif">Thank You</h2>
            <p className="text-md text-[#535c4b] max-w-2xl mx-auto italic">
              It would mean the world to us to have you celebrate this special
              day together
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
