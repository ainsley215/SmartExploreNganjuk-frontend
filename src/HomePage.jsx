import Navbar from '../components/navbar';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="bg-[#F0FDF4] min-h-screen">
      <Navbar />

      {/* HERO / SEARCH SECTION */}
      <section className="text-center py-10 px-4">
        <h1 className="text-3xl font-bold mb-2">Halo Meta! Petualangan Apa Hari Ini?</h1>
        <p className="text-gray-600 mb-6">Dari air terjun tersembunyi, bukit, hingga tempat bersejarah ada disini.</p>
        <input type="text" placeholder="Cari..." className="border p-2 w-1/2 rounded-lg" />
        <button className="bg-[#206B3E] text-white px-6 py-2 ml-2 rounded-lg">Cari</button>
      </section>

      {/* SECTION TERBAIK MINGGU INI */}
      <section className="px-10 py-5">
        <h2 className="text-2xl font-bold mb-4">Terbaik Minggu Ini</h2>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow">
              <div className="h-40 bg-gray-300 rounded-lg mb-3"></div>
              <h3 className="font-bold">Borobudur Sunrise Trail</h3>
              <p className="text-sm text-gray-500">Yogyakarta • 4.9 • 3.2rb ulasan</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION PETA */}
      <section className="px-10 py-10">
        <div className="bg-[#E2F5E9] p-6 rounded-2xl flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Peta Lokasi</h2>
            <p>Pilihan cepat berdasarkan aktivitas pengguna.</p>
          </div>
          <div className="w-1/2 h-40 bg-gray-200 rounded-lg"></div>
        </div>
      </section>

      <Footer />
    </div>
  );
}