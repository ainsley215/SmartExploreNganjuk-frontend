function UserHero({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  onSearchSubmit
}) {
  const user = JSON.parse(localStorage.getItem("user"))

  const categories = ["Semua", "Alam", "Taman", "Edukasi", "Hidden Gem"]

  return (
    <section id="beranda" className="bg-[#E6F0E5] py-24">
      <div className="max-w-4xl mx-auto text-center px-6">

        <h1 className="text-5xl font-bold">
          Halo {user?.username || "Meta"}!
          <br />
          Petualangan Apa Hari Ini?
        </h1>

        <p className="mt-6 text-gray-600">
          Dari air terjun tersembunyi, bukit,
          hingga tempat bersejarah ada disini!
        </p>

        {/* SEARCH BAR (Sudah Disamakan dengan Hero Guest) */}
        <div className="mt-10 flex justify-center">
          <div className="bg-white rounded-2xl shadow-md p-2 flex w-full max-w-2xl focus-within:ring-2 focus-within:ring-[#206B3E]">
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
              className="bg-[#206B3E] text-white px-8 rounded-xl active:scale-95 transition font-medium"
            >
              Cari
            </button>
          </div>
        </div>

        {/* DAFTAR KATEGORI */}
        <div className="flex justify-center gap-3 mt-8 flex-wrap">
          {categories.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full transition-all border ${isActive
                    ? "bg-[#9AD29A] text-green-900 border-green-400 font-semibold shadow-sm"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default UserHero