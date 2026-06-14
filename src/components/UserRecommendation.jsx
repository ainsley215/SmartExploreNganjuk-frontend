import { Link } from "react-router-dom";

function UserRecommendation({ allPlaces }) {
  // 1. Ambil data dari localStorage
  const saved = localStorage.getItem("myFavorites");
  const favorites = saved ? JSON.parse(saved) : [];
  
  // 2. Gunakan 'favorites' untuk ditampilkan (bukan 'allPlaces' lagi)
  // .slice(-3) mengambil 3 data terakhir, .reverse() membaliknya agar terbaru di depan
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

        {/* Cek apakah data favorit KOSONG */}
        {favorites.length === 0 ? (
          <p className="text-gray-500">Belum ada destinasi favorit yang ditambahkan.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {displayedPlaces.map((place, index) => (
              <Link
                key={index}
                to={`/destination/${place.name}`}
                className="block bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
              >
                <img src={place.image} alt={place.name} className="w-full h-56 object-cover" />
                <div className="p-5">
                  <h3 className="font-bold text-xl">{place.name}</h3>
                  <p className="text-gray-500 mt-2">📍 {place.location}</p>
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