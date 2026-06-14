import { useRef } from "react"

function Hero({ searchQuery, setSearchQuery, activeCategory, setActiveCategory, onSearchSubmit }) {
  
  const categories = ["Semua", "Alam", "Taman", "Edukasi", "Hidden Gem"]

  return (
    <section id="beranda" className="bg-[#E6F0E5] py-24">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <div className="inline-block bg-white px-4 py-2 rounded-full shadow-sm mb-6">
          🌿 Jelajahi Wisata Terbaik Nganjuk
        </div>

        <h1 className="text-6xl font-bold leading-tight">
          Nganjuk Punya Banyak
          <br />
          Kejutan Alam
        </h1>

        <h2 className="text-5xl font-bold mt-3 text-[#206B3E]">
          Temukan Yang Belum Semua Orang Tahu!
        </h2>

        <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
          Temukan destinasi wisata alam, budaya, edukasi,
          hingga hidden gem terbaik yang ada di Kabupaten Nganjuk.
        </p>

        {/* Search Bar */}
        <div className="mt-10 flex justify-center">
          <div className="bg-white rounded-2xl shadow-md p-2 flex w-full max-w-2xl">
            <input
              type="text"
              placeholder="Cari destinasi wisata..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearchSubmit()
                }
              }}
              className="flex-1 px-4 py-3 outline-none bg-transparent"
            />
            <button 
              onClick={onSearchSubmit}
              className="bg-[#206B3E] text-white px-8 rounded-xl active:scale-95 transition"
            >
              Cari
            </button>
          </div>
        </div>

        {/* Kategori Dinamis */}
        <div className="flex justify-center flex-wrap gap-4 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === cat
                  ? "bg-[#9AD29A] border border-green-400 font-semibold text-green-900 shadow-sm"
                  : "bg-white border text-gray-600 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Statistik */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-3xl font-bold text-[#206B3E]">128+</h3>
            <p className="text-gray-600">Destinasi Wisata</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-3xl font-bold text-[#206B3E]">4.7★</h3>
            <p className="text-gray-600">Rating Pengunjung</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-3xl font-bold text-[#206B3E]">560+</h3>
            <p className="text-gray-600">Ulasan Wisata</p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero