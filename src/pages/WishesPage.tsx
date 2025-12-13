import { useState } from "react";

type Wish = {
  id: number;
  name: string;
  message: string;
  date: string;
};

export default function WishesPage() {
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: 1,
      name: "Sarah & John",
      message: "Congratulations! Wishing you a lifetime of happiness and love!",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Michael",
      message: "So happy for you both! Can't wait to celebrate with you!",
      date: "2024-01-16",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newWish: Wish = {
      id: wishes.length + 1,
      name: formData.name,
      message: formData.message,
      date: new Date().toISOString().split("T")[0],
    };
    setWishes([...wishes, newWish]);
    setFormData({ name: "", message: "" });
    alert("Thank you for your wishes!");
  };

  return (
    <div className="w-full bg-[#ffedf3] text-[#233235] py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif">Wishes</h2>
          <p className="text-base md:text-lg text-[#535c4b]">
            Leave us a message and share in our joy
          </p>
        </div>

        {/* Wish Form */}
        <div className="bg-white/70 rounded-lg p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="wish-name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="wish-name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-[#535c4b]/30 focus:outline-none focus:ring-2 focus:ring-[#535c4b]"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="wish-message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="wish-message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-[#535c4b]/30 focus:outline-none focus:ring-2 focus:ring-[#535c4b]"
                placeholder="Your wishes and blessings"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#535c4b] text-white rounded-full hover:bg-[#233235] transition-colors font-medium"
            >
              Send Wishes
            </button>
          </form>
        </div>

        {/* Wishes Display */}
        <div className="space-y-6">
          <h3 className="text-2xl font-serif font-bold text-center">Messages from Our Loved Ones</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {wishes.map((wish) => (
              <div
                key={wish.id}
                className="bg-white/70 rounded-lg p-6 shadow-lg space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-lg">{wish.name}</h4>
                  <span className="text-xs text-[#535c4b]">{wish.date}</span>
                </div>
                <p className="text-sm md:text-base text-[#233235]/80">
                  {wish.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

