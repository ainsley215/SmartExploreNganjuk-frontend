import { Link } from "react-router-dom"
import DestinationCard from "./DestinationCard"

function FilterSection({ 
  tagQuery, 
  setTagQuery, 
  sortBy, 
  setSortBy, 
  handleApplyFilter, 
  handleResetFilter, 
  destinations 
}) {
  return (
    <section className="bg-[#E6F0E5] py-8">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-8">
          {/* Filter Tags */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Tags
            </label>
            <input
              type="text"
              placeholder="Contoh: sunset, keluarga, hiking"
              value={tagQuery}
              onChange={(e) => setTagQuery(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-green-600"
            />
            <p className="text-xs text-gray-500 mt-1">
              ketik 1-3 kata kunci, pisahkan dengan koma
            </p>
          </div>

          {/* Urutkan / Sorting */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Urutkan
            </label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="relevan">Paling relevan</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="terdekat">Lokasi Terdekat</option>
            </select>
          </div>
        </div>

        {/* Aksi Filter */}
        <div className="flex gap-4 mt-6 mb-12">
          <button 
            onClick={handleResetFilter}
            className="px-8 py-3 border rounded-lg bg-white hover:bg-gray-50 transition active:scale-95"
          >
            Reset
          </button>
          <button 
            onClick={handleApplyFilter}
            className="px-8 py-3 bg-green-800 text-white rounded-lg hover:bg-green-900 transition active:scale-95 shadow-md"
          >
            Terapkan Filter
          </button>
        </div>

        {/* GRID UNTUK MENAMPILKAN KARTU WISATA HASIL FILTER */}
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Hasil Penelusuran</h3>
        {destinations.length === 0 ? (
          <p className="text-gray-500 text-center py-10 animate-pulse">
            Destinasi wisata yang kamu cari tidak ditemukan...
          </p>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {destinations.map((wisata) => (
              <Link 
                to={`/destination/${wisata.id ? wisata.id : encodeURIComponent(wisata.nama)}`}
                key={wisata.id || wisata.nama} 
                className="block hover:scale-[1.02] transition-transform duration-200"
              >
                <DestinationCard
                  image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200"
                  title={wisata.nama}
                  location="Kabupaten Nganjuk"
                  category={wisata.kategori}
                />
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

export default FilterSection