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
                className={`px-5 py-2 rounded-full border ${
                  filter === item
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
            {filteredData.map((place) => (
              <div
                key={place.id}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <img
                  src={place.image || "https://via.placeholder.com/400"}
                  alt={place.name}
                  className="h-56 w-full object-cover cursor-pointer"
                  onClick={() => navigate(`/destination/${place.id}`)}
                />

                <div className="p-5">
                  <h3 className="font-bold text-xl">{place.name}</h3>
                  <p className="text-gray-500 mt-1">📍 {place.location}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span>⭐ {place.rating}</span>
                    <button
                      onClick={() => removeFavorite(place.id)}
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