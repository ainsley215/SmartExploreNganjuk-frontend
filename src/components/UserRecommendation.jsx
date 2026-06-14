import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

function UserRecommendation() {
  const navigate = useNavigate()

  const places = [
    {
      name: "Jolotundo Glamping & Edupark",
      location: "Loceret, Nganjuk",
      rating: 4.4,
      category: "Alam",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200",
    },
    {
      name: "Taman Nyawiji",
      location: "Payaman, Nganjuk",
      rating: 4.5,
      category: "Taman Kota",
      image:
        "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=1200",
    },
    {
      name: "Museum Anjuk Ladang",
      location: "Kauman, Nganjuk",
      rating: 4.4,
      category: "Sejarah",
      image:
        "https://images.unsplash.com/photo-1566127992631-137a642a90f4?q=80&w=1200",
    },
  ]

  return (
    <section id="destinasi" className="bg-[#E6F0E5] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-5xl font-bold">Berdasarkan Minatmu..</h2>
          <Link to="/favorite" className="font-medium hover:underline">
            Lihat Semua →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {places.map((place, index) => (
            <Link
              key={index}
              to={`/destination/${place.name}`}
              className="block bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="font-bold text-xl">{place.name}</h3>
                <p className="text-gray-500 mt-2">📍 {place.location}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-yellow-500 font-medium">
                    ⭐ {place.rating}
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {place.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UserRecommendation;