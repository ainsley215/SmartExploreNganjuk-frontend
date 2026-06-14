import Navbar from "../components/Navbar"

function MapPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#E6F0E5] p-10">
        <h1 className="text-5xl font-bold">
          Peta Wisata
        </h1>

        <div className="bg-white rounded-3xl mt-8 h-[500px] flex items-center justify-center">
          Peta Akan Ditampilkan Di Sini
        </div>
      </div>
    </>
  )
}

export default MapPage