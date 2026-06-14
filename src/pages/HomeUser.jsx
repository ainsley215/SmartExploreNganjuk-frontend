// import Navbar from "../components/Navbar"
// import UserHero from "../components/UserHero"
// import UserRecommendation from "../components/UserRecommendation"
// import WeeklyRecommendation from "../components/WeeklyRecommendation"
// import FilterSection from "../components/FilterSection"
// import MapSection from "../components/MapSection"
// import Footer from "../components/Footer"

// function HomeUser() {
//   return (
//     <div className="bg-[#E6F0E5] min-h-screen">

//       <Navbar />

//       <UserHero />

//       <div className="max-w-7xl mx-auto px-6">
//         <hr className="border-gray-300" />
//       </div>

//       <UserRecommendation />

//       <FilterSection />

//       <WeeklyRecommendation />

//       <MapSection />

//       <Footer />

//     </div>
//   )
// }

// export default HomeUser

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom" // Import useNavigate untuk redirect otomatis
import Navbar from "../components/Navbar"
import UserHero from "../components/UserHero"
import UserRecommendation from "../components/UserRecommendation"
import WeeklyRecommendation from "../components/WeeklyRecommendation"
import FilterSection from "../components/FilterSection"
import MapSection from "../components/MapSection"
import Footer from "../components/Footer"

function HomeUser() {
  const navigate = useNavigate() // Inisialisasi hook navigate

  // Data hasil olahan AI TF-IDF backend
  const [displayedData, setDisplayedData] = useState([])

  // State kontrol untuk komponen UserHero (Pencarian & Kategori)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Semua")

  // State kontrol untuk komponen FilterSection (Tags & Sorting)
  const [tagQuery, setTagQuery] = useState("")
  const [sortBy, setSortBy] = useState("relevan")

  // State untuk melacak status loading saat AI memproses data
  const [loading, setLoading] = useState(false)

  // Fungsi utama untuk mengambil rekomendasi berbasis AI dari Backend
  const fetchAIRecommendation = (keyword) => {
    setLoading(true)

    fetch(`hhttps://smartexplorenganjuk-production.up.railway.app/api/rekomendasi?q=${encodeURIComponent(keyword)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data dari AI backend")
        return res.json()
      })
      .then((data) => {

        // 1. DAFTAR KATEGORI YANG HARUS DIABAIKAN OLEH LOGIKA REDIRECT
        const listKategori = ["semua", "alam", "taman", "edukasi", "hidden gem"]
        const kataKunciUser = keyword ? keyword.toLowerCase().trim() : ""

        // 2. LOGIKA REDIRECT HANYA JALAN JIKA KEYWORD BUKAN NAMA KATEGORI
        if (kataKunciUser && !listKategori.includes(kataKunciUser) && data.length > 0) {

          // Cari item yang namanya sama persis atau mengandung kata kunci
          const cocokSpesifik = data.find(item =>
            item.nama.toLowerCase().trim() === kataKunciUser ||
            item.nama.toLowerCase().includes(kataKunciUser)
          )

          if (cocokSpesifik) {
            const identifier = cocokSpesifik.id || cocokSpesifik.id_wisata || cocokSpesifik.nama
            navigate(`/destination/${identifier}`)
            setLoading(false)
            return // Stop eksekusi agar tidak mengubah data di halaman beranda
          }
        }

        // 3. JALANKAN SORTING SEPERTI BIASA JIKA HANYA KLIK KATEGORI ATAU TIDAK ADA MATCH
        let hasilFinal = [...data]
        if (sortBy === "rating") {
          hasilFinal.sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0))
        }

        setDisplayedData(hasilFinal)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error AI Engine:", err)
        setLoading(false)
      })
  }

  // Dipanggil pertama kali saat halaman diakses (Load data default)
  useEffect(() => {
    fetchAIRecommendation("Semua")
  }, [])

  // Handler saat tombol kategori di UserHero diklik
  const handleCategoryChange = (kategori) => {
    setActiveCategory(kategori)
    setSearchQuery("") // Reset text pencarian biar tidak tabrakan
    fetchAIRecommendation(kategori) // Tembak AI dengan nama kategori
  }

  // Handler saat tombol "Cari" di UserHero ditekan
  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      setActiveCategory("") // Matikan highlight kategori aktif
      fetchAIRecommendation(searchQuery) // Tembak AI dengan teks input user
    }
  }

  // Handler saat user menekan tombol "Terapkan Filter" di FilterSection (Berdasarkan Tags)
  const handleApplyFilter = () => {
    if (tagQuery.trim() !== "") {
      fetchAIRecommendation(tagQuery)
    } else {
      fetchAIRecommendation(searchQuery || activeCategory)
    }
  }

  // Handler untuk mereset semua kondisi pencarian dan filter
  const handleResetFilter = () => {
    setTagQuery("")
    setSortBy("relevan")
    setSearchQuery("")
    setActiveCategory("Semua")
    fetchAIRecommendation("Semua")
  }

  // Trigger re-sort otomatis jika user mengubah pilihan dropdown urutan tanpa fetch ulang
  useEffect(() => {
    if (displayedData.length > 0) {
      const dataCopy = [...displayedData]
      if (sortBy === "rating") {
        dataCopy.sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0))
      } else {
        return
      }
      setDisplayedData(dataCopy)
    }
  }, [sortBy])

  return (
    <div className="bg-[#E6F0E5] min-h-screen">
      <Navbar />

      {/* Oper fungsi handler AI ke UserHero */}
      <UserHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={handleCategoryChange}
        onSearchSubmit={handleSearchSubmit}
      />

      <div className="max-w-7xl mx-auto px-6">
        <hr className="border-gray-300" />
      </div>

      {/* REKOMENDASI PINTAR BERBASIS AI (Mengambil 3 data teratas hasil TF-IDF) */}
      <UserRecommendation destinations={displayedData.slice(0, 3)} />

      {/* Tampilkan indikator loading jika AI Flask sedang menghitung Cosine Similarity */}
      {loading ? (
        <div className="text-center py-20 text-gray-600 font-medium bg-[#E6F0E5] animate-pulse">
          🧠 AI sedang menghitung skor relevansi TF-IDF & Cosine Similarity...
        </div>
      ) : (
        <FilterSection
          tagQuery={tagQuery}
          setTagQuery={setTagQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          handleApplyFilter={handleApplyFilter}
          handleResetFilter={handleResetFilter}
          destinations={displayedData} // Lempar hasil olahan AI ke card grid
        />
      )}

      {/* Rekomendasi mingguan mengambil data urutan berikutnya (indeks 3 sampai 6) */}
      <WeeklyRecommendation destinations={displayedData.slice(3, 6)} />

      {/* Peta Interaktif menerima koordinat letak dari data destinasi terfilter */}
      <MapSection destinations={displayedData} />

      <Footer />
    </div>
  )
}

export default HomeUser