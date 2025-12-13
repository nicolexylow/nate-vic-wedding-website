export default function GiftRegistryPage() {
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    alert(`${type} copied to clipboard!`);
  };

  return (
    <div className="w-full bg-[#ffedf3] text-[#233235] py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif">
            Gift Registry
          </h2>
          <p className="text-base md:text-lg text-[#535c4b] max-w-2xl mx-auto">
            Your presence is the greatest gift, but if you'd like to celebrate with us in another way...
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bank Transfer */}
          <div className="bg-white/70 rounded-lg p-8 shadow-lg space-y-6 text-center">
            <h3 className="text-2xl font-serif font-bold">Bank Transfer</h3>
            <div className="space-y-4">
              <div>
                <p className="text-lg font-semibold mb-2">Bank Name</p>
                <p className="text-2xl font-bold text-[#535c4b]">1234567890</p>
                <p className="text-sm text-[#535c4b] mt-1">Account Name: Nathanael & Victoria</p>
              </div>
              <button
                onClick={() => copyToClipboard("1234567890", "Account number")}
                className="px-6 py-2 bg-[#535c4b] text-white rounded-full hover:bg-[#233235] transition-colors text-sm"
              >
                Copy Account Number
              </button>
            </div>
          </div>

          {/* Send Gift */}
          <div className="bg-white/70 rounded-lg p-8 shadow-lg space-y-6 text-center">
            <h3 className="text-2xl font-serif font-bold">Send Gift</h3>
            <div className="space-y-4">
              <div>
                <p className="text-lg font-semibold mb-2">Mailing Address</p>
                <p className="text-sm text-[#535c4b] leading-relaxed">
                  123 Gift Street
                  <br />
                  City, State 12345
                  <br />
                  United States
                </p>
              </div>
              <button
                onClick={() => copyToClipboard("123 Gift Street\nCity, State 12345\nUnited States", "Address")}
                className="px-6 py-2 bg-[#535c4b] text-white rounded-full hover:bg-[#233235] transition-colors text-sm"
              >
                Copy Address
              </button>
            </div>
          </div>
        </div>

        {/* Registry Links */}
        <div className="bg-white/70 rounded-lg p-8 shadow-lg text-center space-y-6">
          <h3 className="text-2xl font-serif font-bold">Wedding Registry</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white text-[#535c4b] rounded-full border-2 border-[#535c4b] hover:bg-[#535c4b] hover:text-white transition-colors"
            >
              Amazon Registry
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white text-[#535c4b] rounded-full border-2 border-[#535c4b] hover:bg-[#535c4b] hover:text-white transition-colors"
            >
              Target Registry
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white text-[#535c4b] rounded-full border-2 border-[#535c4b] hover:bg-[#535c4b] hover:text-white transition-colors"
            >
              Bed Bath & Beyond
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

