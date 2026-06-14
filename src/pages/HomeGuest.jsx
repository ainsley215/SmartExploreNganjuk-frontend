// import Navbar from "../components/Navbar"
// import Hero from "../components/Hero"
// import PopularSection from "../components/PopularSection"
// import FilterSection from "../components/FilterSection"
// import HiddenGemSection from "../components/HiddenGemSection"
// import MapSection from "../components/MapSection"
// import Footer from "../components/Footer"

// function HomeGuest() {
//   return (
//     <>
//       <Navbar />
//       <Hero />
//       <PopularSection />
//       <FilterSection />
//       <HiddenGemSection />
//       <MapSection />
//       <Footer />
//     </>
//   )
// }

// export default HomeGuest

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import FilterSection from "../components/FilterSection"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom" // Sudah ter-import

function HomeGuest() {
  const navigate = useNavigate() // 1. INI YANG KURANG (Wajib dideklarasikan di sini)

  // Data yang didapat langsung dari hasil perhitungan AI TF-IDF Flask
  const [displayedData, setDisplayedData] = useState([])

  // State kontrol untuk komponen Hero (Pencarian & Kategori)
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

    fetch(`http://localhost:5000/api/rekomendasi?q=${encodeURIComponent(keyword)}`)
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

  // Handler saat tombol kategori di Hero diklik
  const handleCategoryChange = (kategori) => {
    setActiveCategory(kategori)
    setSearchQuery("") // Reset text pencarian biar ga tabrakan
    fetchAIRecommendation(kategori) // Tembak AI dengan nama kategori (cth: "Alam")
  }

  // Handler saat tombol "Cari" di Hero ditekan
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
      const dataCopy = [...displayedData];

      if (sortBy === "rating") {
        dataCopy.sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0));
        setDisplayedData(dataCopy);
      } 
      else if (sortBy === "terdekat") {
        // Panggil geolokasi, baru urutkan
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            dataCopy.forEach(item => {
              // Asumsi di dataset kamu ada kolom 'lat' dan 'lng'
              item.distance = calculateDistance(latitude, longitude, item.lat, item.lng);
            });
            dataCopy.sort((a, b) => a.distance - b.distance);
            setDisplayedData(dataCopy);
          },
          (err) => {
            console.error("Gagal ambil lokasi:", err);
            alert("Aktifkan lokasi di browser untuk menggunakan fitur Terdekat");
          }
        );
      }
    }
  }, [sortBy]);

  return (
    <>
      <Navbar />

      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={handleCategoryChange}
        onSearchSubmit={handleSearchSubmit}
      />

      {loading ? (
        <div className="bg-[#E6F0E5] py-20 text-center text-gray-600 font-medium animate-pulse">
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
          destinations={displayedData}
        />
      )}

      <Footer />
    </>
  )
}

export default HomeGuest