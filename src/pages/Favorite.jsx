import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

function Favorite() {
  const navigate = useNavigate()

  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Air Terjun Sedudo",
      category: "Alam",
      location: "Sawahan",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    {
      id: 2,
      name: "Taman Nyawiji",
      category: "Taman",
      location: "Payaman",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1519331379826-f10be5486c6f",
    },
    {
      id: 3,
      name: "Museum Anjuk Ladang",
      category: "Edukasi",
      location: "Kauman",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1566127992631-137a642a90f4",
    },
  ])

  const [filter, setFilter] = useState("Semua")

  const removeFavorite = (id) => {
    setFavorites(
      favorites.filter((item) => item.id !== id)
    )
  }

  const filteredData =
    filter === "Semua"
      ? favorites
      : favorites.filter(
          (item) => item.category === filter
        )

  return (
     <>
    <Navbar />
    <div className="bg-[#E6F0E5] min-h-screen">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <p className="text-lg">
          Tempat yang kamu suka
        </p>

        <h1 className="text-5xl font-bold mt-2 mb-10">
          Koleksi Favoritmu!
        </h1>

        {/* Filter */}
        <div className="flex gap-3 mb-10">
          {["Semua", "Alam", "Taman", "Edukasi"].map(
            (item) => (
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
            )
          )}
        </div>

        {/* Card */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredData.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <img
                src={place.image}
                alt={place.name}
                className="h-56 w-full object-cover cursor-pointer"
                onClick={() =>
                  navigate(`/destination/${place.id}`)
                }
              />

              <div className="p-5">
                <h3 className="font-bold text-xl">
                  {place.name}
                </h3>

                <p className="text-gray-500 mt-1">
                  📍 {place.location}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span>
                    ⭐ {place.rating}
                  </span>

                  <button
                    onClick={() =>
                      removeFavorite(place.id)
                    }
                    className="text-red-500 text-xl"
                  >
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center mt-20">
            <h3 className="text-2xl font-semibold">
              Belum ada favorit
            </h3>
          </div>
        )}

      </div>

    </div>
    </>
  )
}

export default Favorite