export default function GiftRegistryPage() {
  return (
    <div className="w-full text-[#2a2a2a] py-15 px-6">
      <div
        className="max-w-4xl mx-auto space-y-10 bg-white/90 border-6 border-white px-5 py-10 rounded-2xl"
        style={{ boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.15)" }}
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-serif">Gift Registry</h2>
          <p className="text-md max-w-2xl mx-auto italic text-[#696969]">
          We’re so excited to celebrate with you — that’s the best gift we could ask for!
          </p>
          <p className="text-md max-w-2xl mx-auto italic text-[#696969]">For those who wish to honour us with a gift, we would greatly appreciate a contribution to our future home fund.</p>
        </div>

        <div className="grid gap-8">
          {/* Bank Transfer */}
          <div className="bg-white border-4 border-red-50 rounded-2xl p-8 shadow-lg space-y-6 text-center">
            <h3 className="text-xl font-serif font-bold">Bank Transfer</h3>
            <div className="space-y-4">
              <div>
                <p className="text-lg mb-2">Bank Name</p>
                <p className="text-xl font-bold text-[#535c4b]">1234567890</p>
                <p className="text-md text-[#535c4b] mt-1">
                  Account Name: Nathanael & Victoria
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
