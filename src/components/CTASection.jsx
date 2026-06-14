function CTASection() {
  return (
    <section className="bg-[#E6F0E5] py-20">

      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-5xl font-bold">
          Simpan, Jelajahi, dan
          <br />
          Ceritakan Perjalananmu!
        </h2>

        <p className="mt-4 text-gray-600">
          Daftar dan nikmati fitur personal untuk
          menjelajahi Nganjuk lebih mudah.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow">
            <div className="text-5xl mb-4">🏞️</div>

            <h3 className="font-bold text-lg">
              Simpan Favorit
            </h3>

            <p className="text-gray-500 mt-2">
              Tandai tempat wisata yang ingin
              kamu kunjungi nanti.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow">
            <div className="text-5xl mb-4">✍️</div>

            <h3 className="font-bold text-lg">
              Tulis Ulasan
            </h3>

            <p className="text-gray-500 mt-2">
              Bagikan pengalamanmu dan bantu
              wisatawan lainnya.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow">
            <div className="text-5xl mb-4">📍</div>

            <h3 className="font-bold text-lg">
              Lihat Jarak
            </h3>

            <p className="text-gray-500 mt-2">
              Temukan destinasi terdekat dari
              lokasi kamu sekarang.
            </p>
          </div>

        </div>

        <button className="mt-10 px-10 py-4 bg-green-800 text-white rounded-xl">
          Daftar Sekarang
        </button>

      </div>

    </section>
  )
}

export default CTASection