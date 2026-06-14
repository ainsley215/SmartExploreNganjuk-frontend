function MapSection() {
  return (
    <section id="peta" className="bg-[#E6F0E5] py-16">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold mb-8">
          Peta Lokasi
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>
            <p className="text-gray-700">
              Pilihan cepat berdasarkan aktivitas pengguna
              untuk mempercepat pencarian destinasi wisata.
            </p>
          </div>

          <div className="bg-[#DCE8D8] rounded-3xl h-[350px] flex items-center justify-center">
            <div className="text-center text-gray-600">
              🗺️
              <p className="mt-3">
                Peta interaktif akan ditampilkan di sini
              </p>
              <p className="text-sm">
                (Leaflet / Google Maps)
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  )
}

export default MapSection