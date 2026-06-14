import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function History() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengambil data dari backend Flask
    fetch('https://smartexplorenganjuk-production.up.railway.app/destinations')
    // fetch('http://127.0.0.1:5000/destinations')
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Memuat data wisata...</div>;
  }

  return (
    <div className="bg-[#F0FDF4] min-h-screen">
      <Navbar />

      <div className="px-10 py-8">
        <p className="text-gray-600">Wisata yang pernah kamu buka sebelumnya</p>
        <h1 className="text-3xl font-bold mb-6">Riwayat Kunjunganmu!</h1>

        {/* Filter Bar */}
        <div className="flex gap-3 mb-8">
          {['Semua', 'Alam', 'Taman', 'Edukasi'].map((kategori) => (
            <button key={kategori} className="px-6 py-1 border border-gray-400 rounded-full hover:bg-green-100">
              {kategori}
            </button>
          ))}
        </div>

        {/* Daftar Hari Ini */}
        <h2 className="text-xl font-bold mb-4">Hari Ini</h2>
        <div className="space-y-4 mb-8">
          {data.slice(0, 3).map((item) => (
            <div key={item.id} className="bg-[#C8E6C9] p-4 rounded-xl flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 bg-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-500">Foto</div>
                <div>
                  <h3 className="font-bold capitalize">{item.nama}</h3>
                  <p className="text-sm">📍 {item.deskripsi ? item.deskripsi.substring(0, 60) : "Tidak ada deskripsi"}...</p>
                  <span className="inline-block mt-2 text-xs bg-white/50 px-2 py-1 rounded">{item.kategori}</span>
                </div>
              </div>
              <button className="border border-black px-4 py-1 rounded-lg hover:bg-white">Lihat Lagi</button>
            </div>
          ))}
        </div>

        {/* Daftar Kemarin */}
        <h2 className="text-xl font-bold mb-4">Kemarin</h2>
        <div className="space-y-4">
          {data.slice(3, 6).map((item) => (
            <div key={item.id} className="bg-[#C8E6C9] p-4 rounded-xl flex items-center">
              <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
              <div className="ml-4">
                <h3 className="font-bold capitalize">{item.nama}</h3>
                <p className="text-sm">📍 {item.deskripsi ? item.deskripsi.substring(0, 60) : "..."}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}