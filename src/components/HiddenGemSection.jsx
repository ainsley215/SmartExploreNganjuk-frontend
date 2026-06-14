function HiddenGemSection() {

  const gems = [1, 2, 3]

  return (
    <section className="bg-[#E6F0E5] py-16">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold mb-10">
          Hidden Gem
        </h2>

        {/* Statistik */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-xl p-6 shadow">
            <p className="text-gray-500">
              Destinasi ditemukan
            </p>

            <h3 className="text-4xl font-bold">
              128
            </h3>

            <p className="text-green-600 text-sm">
              +12% hari ini
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <p className="text-gray-500">
              Rata-rata rating
            </p>

            <h3 className="text-4xl font-bold">
              4.7
            </h3>

            <p className="text-green-600 text-sm">
              Naik 0.1
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <p className="text-gray-500">
              Ulasan terbaru
            </p>

            <h3 className="text-4xl font-bold">
              560+
            </h3>

            <p className="text-green-600 text-sm">
              +8% minggu ini
            </p>
          </div>

        </div>

        {/* Card */}

        <div className="grid md:grid-cols-3 gap-8">

          {gems.map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl overflow-hidden shadow"
            >
              <div className="h-56 bg-gray-300"></div>

              <div className="p-4">

                <p className="text-xs bg-gray-200 inline-block px-2 py-1 rounded">
                  Glamping Favorit
                </p>

                <h3 className="mt-3 font-bold">
                  Borobudur Sunrise Trail
                </h3>

                <p className="text-gray-600">
                  Yogyakarta • 4.9 • 3.2rb ulasan
                </p>

                <div className="mt-2">
                  ⭐ ❤️ 🧭
                </div>

              </div>
            </div>
          ))}

        </div>

        <div className="text-right mt-8">
          <button className="font-medium hover:underline">
            Lihat Semua →
          </button>
        </div>

      </div>

    </section>
  )
}

export default HiddenGemSection