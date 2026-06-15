import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function UserRecommendation() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // 1. Ambil user dari localStorage untuk menentukan kunci yang sama
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const storageKey = user.username ? `favorites_${user.username}` : "favorites_guest";
    
    // 2. Ambil data dengan kunci yang sudah disinkronkan
    const saved = localStorage.getItem(storageKey);
    const parsed = saved ? JSON.parse(saved) : [];
    setFavorites(parsed);
  }, []); // Berjalan sekali saat komponen dimuat

  const displayedPlaces = [...favorites].slice(-3).reverse();

  return (
    <section id="destinasi" className="bg-[#E6F0E5] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-5xl font-bold">Berdasarkan Minatmu..</h2>
          <Link to="/favorite" className="font-medium hover:underline">
            Lihat Semua →
          </Link>
        </div>

        {favorites.length === 0 ? (
          <p className="text-gray-500">Belum ada destinasi favorit yang ditambahkan.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {displayedPlaces.map((place, index) => (
              <Link
                key={index}
                to={`/destination/${place.id}`} // Pastikan navigasi menggunakan ID
                className="block bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
              >
                <img src={place.image || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"} alt={place.nama || place.name} className="w-full h-56 object-cover" />
                <div className="p-5">
                  <h3 className="font-bold text-xl">{place.nama || place.name}</h3>
                  <p className="text-gray-500 mt-2">📍 {place.location || "Nganjuk"}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default UserRecommendation;