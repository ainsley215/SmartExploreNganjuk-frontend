function PopularSection() {
  const places = [
    {
      name: "Jolotundo Glamping & Edupark",
      location: "Loceret, Nganjuk",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200",
      category: "Alam",
      rating: "4.8",
    },
    {
      name: "Taman Nyawiji",
      location: "Payaman, Nganjuk",
      image:
        "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=1200",
      category: "Taman Kota",
      rating: "4.6",
    },
    {
      name: "Museum Anjuk Ladang",
      location: "Kauman, Nganjuk",
      image:
        "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1200",
      category: "Sejarah",
      rating: "4.5",
    },
  ]

  return (
    <section id="destinasi" className="bg-[#E6F0E5] py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-12">

          <div>
            <p className="text-green-700 font-medium">
              Destinasi Favorit
            </p>

            <h2 className="text-4xl font-bold mt-2">
              Paling Banyak Dikunjungi!
            </h2>
          </div>

          <button className="px-5 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition">
            Lihat Semua →
          </button>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {places.map((place, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-[28px]
                overflow-hidden
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              <div className="relative">

                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-60 object-cover"
                />

                <span className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm shadow">
                  ⭐ {place.rating}
                </span>

              </div>

              <div className="p-6">

                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {place.category}
                </span>

                <h3 className="font-bold text-xl mt-4">
                  {place.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  📍 {place.location}
                </p>

                <button className="mt-5 w-full py-3 rounded-xl bg-[#206B3E] text-white hover:bg-green-800 transition">
                  Lihat Detail
                </button>

              </div>

            </div>
          ))}

        </div>

        <div className="mt-16">
          <hr className="border-gray-300" />
        </div>

      </div>

    </section>
  )
}

export default PopularSection