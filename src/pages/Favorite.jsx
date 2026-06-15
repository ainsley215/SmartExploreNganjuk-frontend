import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Favorite() {
  const navigate = useNavigate();

  // 1. Ambil informasi user untuk menentukan kunci penyimpanan
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const storageKey = user.username ? `favorites_${user.username}` : "favorites_guest";

  // 2. Ambil data dari localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("Semua");

  // 3. Gunakan useEffect agar data di localStorage selalu diperbarui saat 'favorites' berubah
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(favorites));
  }, [favorites, storageKey]);

  // Fungsi hapus favorit
  const removeFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  // Logika Filter
  const filteredData =
    filter === "Semua"
      ? favorites
      : favorites.filter((item) => item.category === filter);

  return (
    <>
      <Navbar />
      <div className="bg-[#E6F0E5] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-lg">Tempat yang kamu suka</p>
          <h1 className="text-5xl font-bold mt-2 mb-10">Koleksi Favoritmu!</h1>

          {/* Filter */}
          <div className="flex gap-3 mb-10">
            {["Semua", "Alam", "Taman", "Edukasi"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-5 py-2 rounded-full border ${filter === item
                    ? "bg-green-600 text-white"
                    : "bg-white"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Card */}
          <div className="grid md:grid-cols-3 gap-8">
            {filteredData.map((wisata) => ( // Menggunakan 'wisata' agar sesuai dengan data CSV
              <div
                key={wisata.id}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200" // Placeholder sesuai permintaan
                  alt={wisata.nama}
                  className="h-56 w-full object-cover cursor-pointer"
                  onClick={() => navigate(`/destination/${wisata.id}`)}
                />

                <div className="p-5">
                  <h3 className="font-bold text-xl">{wisata.nama}</h3>
                  <p className="text-gray-500 mt-1">📍 Kabupaten Nganjuk</p> {/* Lokasi default */}
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                      {wisata.kategori}
                    </span>
                    <button
                      onClick={() => removeFavorite(wisata.id)}
                      className="text-red-500 text-xl"
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Jika kosong */}
          {filteredData.length === 0 && (
            <div className="text-center mt-20">
              <h3 className="text-2xl font-semibold">Belum ada favorit</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Favorite;