// import Navbar from "../components/Navbar"

// function Destination() {
//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen bg-[#E6F0E5] p-10">
//         <h1 className="text-5xl font-bold">
//           Semua Destinasi
//         </h1>

//         <p className="mt-4">
//           Daftar wisata di Kabupaten Nganjuk.
//         </p>
//       </div>
//     </>
//   )
// }

// export default Destination

import { useState, useEffect } from "react"
import { Link } from "react-router-dom" // Digunakan untuk navigasi ke detail
import Navbar from "../components/Navbar"
import DestinationCard from "../components/DestinationCard" // Pastikan import card kamu

function Destination() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Ambil data dari Flask
    fetch("https://smartexplorenganjuk-production.up.railway.app/destinations")
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Gagal memuat data:", err)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#E6F0E5] p-10">
        <h1 className="text-5xl font-bold">Semua Destinasi</h1>
        <p className="mt-4">Daftar wisata di Kabupaten Nganjuk.</p>

        {loading ? (
          <p className="mt-10 text-gray-600 animate-pulse">Memuat tempat wisata...</p>
        ) : (
          /* Grid pembungkus card */
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 mt-10">
            {destinations.map((wisata) => (
              <Link to={`/destination/${wisata.id}`} key={wisata.id || wisata.nama}>
                <DestinationCard
                  image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200" // Sementara pakai placeholder
                  title={wisata.nama}        // Sesuai kolom 'nama' di CSV
                  location="Kabupaten Nganjuk" // Default lokasi karena di CSV tidak ada kolom kecamatan
                  category={wisata.kategori} // Sesuai kolom 'kategori' di CSV
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Destination