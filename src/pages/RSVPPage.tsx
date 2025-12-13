import { useState } from "react";

export default function RSVPPage() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    attendance: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to a backend
    const whatsappMessage = `Hi! I'm ${formData.name}. ${formData.attendance ? `I ${formData.attendance.toLowerCase()}.` : ""} ${formData.message ? `Message: ${formData.message}` : ""}`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="w-full bg-white text-[#233235] py-20 px-6">
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif">RSVP</h2>
          <p className="text-base md:text-lg text-[#535c4b]">
            Please let us know if you'll be joining us on our special day
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#ffedf3]/50 rounded-lg p-8 shadow-lg space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-[#535c4b]/30 focus:outline-none focus:ring-2 focus:ring-[#535c4b]"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-[#535c4b]/30 focus:outline-none focus:ring-2 focus:ring-[#535c4b]"
              placeholder="Your message or wishes for us"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Attendance *</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  value="Yes, I will attend"
                  checked={formData.attendance === "Yes, I will attend"}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                  className="w-4 h-4 text-[#535c4b] focus:ring-[#535c4b]"
                />
                <span>Yes, I will attend</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  value="Maybe"
                  checked={formData.attendance === "Maybe"}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                  className="w-4 h-4 text-[#535c4b] focus:ring-[#535c4b]"
                />
                <span>I'm still unsure</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  value="Sorry, I cannot attend"
                  checked={formData.attendance === "Sorry, I cannot attend"}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                  className="w-4 h-4 text-[#535c4b] focus:ring-[#535c4b]"
                />
                <span>Sorry, I cannot attend</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-[#535c4b] text-white rounded-full hover:bg-[#233235] transition-colors font-medium"
          >
            Confirm via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}

