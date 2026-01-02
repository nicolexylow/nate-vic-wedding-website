export default function GiftRegistryPage() {
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    alert(`${type} copied to clipboard!`);
  };

  return (
    <div className="w-full text-[#233235] py-15 px-6">
      <div className="max-w-4xl mx-auto space-y-10 bg-white/90 border-5 border-white px-5 py-10 rounded-2xl" style={{ boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.15)" }}
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-serif">
            Gift Registry
          </h2>
          <p className="text-md max-w-2xl mx-auto italic text-[#696969]">
            Your presence is the greatest gift, but if you'd like to celebrate with us in another way...
          </p>
        </div>

        <div className="grid gap-8">
          {/* Bank Transfer */}
          <div className="bg-white border-4 border-red-50 rounded-2xl p-8 shadow-lg space-y-6 text-center">
            <h3 className="text-xl font-serif font-bold">Bank Transfer</h3>
            <div className="space-y-4">
              <div>
                <p className="text-lg mb-2">Bank Name</p>
                <p className="text-xl font-bold text-[#535c4b]">1234567890</p>
                <p className="text-md text-[#535c4b] mt-1">Account Name: Nathanael & Victoria</p>
              </div>
              <button
                onClick={() => copyToClipboard("1234567890", "Account number")}
                className="px-6 py-2 bg-[#ffe4e6] rounded-full hover:bg-[#233235] transition-colors text-sm"
              >
                Copy Account Number
              </button>
            </div>
          </div>

          {/* Send Gift */}
          <div className="bg-white border-4 border-red-50 rounded-2xl p-8 shadow-lg space-y-6 text-center">
            <h3 className="text-xl font-serif font-bold">Send Gift</h3>
            <div className="space-y-4">
              <div>
                <p className="text-lg mb-2">Mailing Address</p>
                <p className="text-md font-semibold text-[#535c4b] leading-relaxed">
                  123 Gift Street
                  <br />
                  City, State 12345
                  <br />
                  United States
                </p>
              </div>
              <button
                onClick={() => copyToClipboard("123 Gift Street\nCity, State 12345\nUnited States", "Address")}
                className="px-6 py-2 bg-[#ffe4e6] rounded-full hover:bg-[#233235] transition-colors text-sm"
              >
                Copy Address
              </button>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}

