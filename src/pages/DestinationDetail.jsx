// import Navbar from "../components/Navbar"
// import Footer from "../components/Footer"

// function DestinationDetail() {
//   return (
//     <div className="min-h-screen bg-[#E6F0E5]">

//       <Navbar />

//       <section className="max-w-7xl mx-auto px-8 py-14">

//         <div className="grid md:grid-cols-2 gap-14">

//           {/* FOTO */}
//           <div>
//             <img
//               src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200"
//               alt="Sedudo"
//               className="w-full rounded-lg"
//             />
//           </div>

//           {/* DETAIL */}
//           <div>

//             <div className="flex justify-between items-start">

//               <h1 className="text-5xl font-bold">
//                 {wisata.nama} {/* Kolom 'nama' */}
//               </h1>

//               <button className="text-3xl">
//                 ♡
//               </button>

//             </div>

//             <div className="mt-6">

//               <span className="bg-green-200 text-green-800 px-4 py-2 rounded-lg">
//                 {wisata.kategori} {/* Kolom 'kategori' */}
//               </span>

//               <p className="mt-3 text-gray-700">
//                 Tags: {wisata.tags || "-"} {/* Kolom 'tags' */}
//               </p>

//             </div>

//             <div className="grid grid-cols-2 gap-6 mt-10">
//               <div>
//                 <h3 className="text-2xl font-semibold">Rating</h3>
//                 <p className="text-gray-500 mb-2">Penilaian Pengunjung</p>
//                 <div className="bg-white border rounded-lg px-4 py-3 shadow-sm font-bold text-yellow-600">
//                   {wisata.rating || "0"} / 5
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-2xl font-semibold">Koordinat</h3>
//                 <p className="text-gray-500 mb-2">Lat / Long</p>
//                 <div className="bg-white border rounded-lg px-4 py-3 shadow-sm text-sm text-gray-600">
//                   {wisata.latitude}, {wisata.longitude} {/* Kolom 'latitude' & 'longitude' */}
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8 bg-white rounded-lg border p-5 shadow-sm">
//               <h3 className="font-semibold text-xl mb-3">Deskripsi</h3>
//               <p className="text-gray-700 leading-relaxed">
//                 {wisata.deskripsi} {/* Kolom 'deskripsi' */}
//               </p>
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* REVIEW */}
//       <section className="max-w-7xl mx-auto px-8 pb-20">

//         <h2 className="text-4xl font-bold mb-10">
//           Latest Reviews
//         </h2>

//         <div className="grid md:grid-cols-3 gap-8">

//           <ReviewCard
//             name="Putri_Ara"
//           />

//           <ReviewCard
//             name="Annisaa_"
//           />

//           <ReviewCard
//             name="Fadira_EP"
//           />

//         </div>

//       </section>

//       <Footer />

//     </div>
//   )
// }

// function ReviewCard({ name }) {
//   return (
//     <div className="bg-white p-6 rounded-lg border">

//       <div className="text-xl mb-4">
//         ⭐⭐⭐⭐⭐
//       </div>

//       <h3 className="text-3xl font-bold mb-2">
//         {name}
//       </h3>

//       <p className="text-gray-600">
//         Review body
//       </p>

//       <div className="flex items-center gap-3 mt-8">

//         <img
//           src="https://i.pravatar.cc/50"
//           alt=""
//           className="w-10 h-10 rounded-full"
//         />

//         <div>

//           <p className="font-medium">
//             Reviewer name
//           </p>

//           <p className="text-gray-400">
//             Date
//           </p>

//         </div>

//       </div>

//     </div>
//   )
// }

// export default DestinationDetail

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom" // Ditambahkan useNavigate
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function DestinationDetail() {
  const { id } = useParams()
  const navigate = useNavigate() // Inisialisasi fungsi navigasi
  
  const [wisata, setWisata] = useState(null) 
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)

  // 1. Fetch data detail wisata dari Flask backend
  useEffect(() => {
    fetch(`http://localhost:5000/destinations/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Data destinasi tidak ditemukan")
        return res.json()
      })
      .then((data) => {
        setWisata(data) 
        setLoading(false)
      })
      .catch((err) => {
        console.error("Gagal mengambil detail:", err)
        setLoading(false)
      })
  }, [id])

  // 2. Cek apakah destinasi ini sudah ada di daftar favorit lokal ketika data wisata berhasil dimuat
  useEffect(() => {
    if (wisata) {
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      const storageKey = user.username ? `favorites_${user.username}` : "favorites_guest"
      const currentFavorites = JSON.parse(localStorage.getItem(storageKey) || "[]")
      
      // Cari tahu apakah item ini sudah masuk array favorit
      const found = currentFavorites.some((item) => String(item.id) === String(wisata.id))
      setIsFavorite(found)
    }
  }, [wisata])

  // 3. Fungsi penanganan klik tombol favorit
  const handleFavoriteClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const user = JSON.parse(localStorage.getItem("user") || "{}")

    // Jika user belum login, batalkan aksi dan beri peringatan
    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu untuk menambahkan ke favorit!")
      navigate("/login") // Otomatis diarahkan ke page login
      return
    }

    // Jika sudah login, kelola data di localStorage berbasis username unik
    const storageKey = `favorites_${user.username}`
    let currentFavorites = JSON.parse(localStorage.getItem(storageKey) || "[]")

    if (isFavorite) {
      // Hapus dari list jika sudah ada (Unfavorite)
      currentFavorites = currentFavorites.filter((item) => String(item.id) !== String(wisata.id))
      setIsFavorite(false)
    } else {
      // Tambahkan item baru jika belum terdaftar (Favorite)
      currentFavorites.push({
        id: wisata.id,
        nama: wisata.nama,
        kategori: wisata.kategori,
        rating: wisata.rating,
        latitude: wisata.latitude,
        longitude: wisata.longitude
      })
      setIsFavorite(true)
    }

    // Simpan data array terupdate ke localStorage
    localStorage.setItem(storageKey, JSON.stringify(currentFavorites))
  }

  if (loading) {
    return <div className="min-h-screen bg-[#E6F0E5] flex items-center justify-center">Memuat detail tempat...</div>
  }

  if (!wisata) {
    return <div className="min-h-screen bg-[#E6F0E5] flex items-center justify-center">Destinasi wisata tidak ditemukan!</div>
  }

  return (
    <div className="min-h-screen bg-[#E6F0E5]">
      <Navbar />

      <section className="max-w-7xl mx-auto px-8 py-14">
        <div className="grid md:grid-cols-2 gap-14">
          
          {/* FOTO */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200"
              alt={wisata.nama}
              className="w-full h-[400px] object-cover rounded-lg shadow-md"
            />
          </div>

          {/* DETAIL */}
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-5xl font-bold capitalize">
                {wisata.nama} 
              </h1>
              
              {/* Tombol Hati dengan Style Tailwind Dinamis */}
              <button 
                onClick={handleFavoriteClick}
                className={`text-3xl transition-all active:scale-95 duration-150 select-none ${
                  isFavorite ? "text-red-500 scale-110" : "text-gray-400 hover:text-red-400"
                }`}
              >
                {isFavorite ? "❤️" : "♡"}
              </button>
            </div>

            <div className="mt-6">
              <span className="bg-green-200 text-green-800 px-4 py-2 rounded-lg font-medium">
                {wisata.kategori}
              </span>
              <p className="mt-3 text-gray-700 italic">
                Tags: {wisata.tags || "-"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-10">
              <div>
                <h3 className="text-2xl font-semibold">Rating</h3>
                <p className="text-gray-500 mb-2">Penilaian</p>
                <div className="bg-white border rounded-lg px-4 py-3 shadow-sm font-bold text-yellow-600">
                  ⭐ {wisata.rating || "0"} / 5
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold">Koordinat</h3>
                <p className="text-gray-500 mb-2">Lat / Long</p>
                <div className="bg-white border rounded-lg px-4 py-3 shadow-sm text-sm text-gray-600">
                  {wisata.latitude}, {wisata.longitude}
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg border p-5 shadow-sm">
              <h3 className="font-semibold text-xl mb-3">Deskripsi</h3>
              <p className="text-gray-700 leading-relaxed">
                {wisata.deskripsi}
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}

export default DestinationDetail