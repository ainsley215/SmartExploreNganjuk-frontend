import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Profil() {
  const [user, setUser] = useState({
    nama_lengkap: "Fadira Septa",
    email: "fadira@gmail.com",
    username: "dira"
  });

  useEffect(() => {
    fetch('https://smartexplorenganjuk-production.up.railway.app/profile')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.log("Backend belum terhubung, menggunakan data dummy."));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/profile/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      throw new Error('Server merespon dengan error');
    }

    const data = await response.json();
    alert("Profil Berhasil Diperbarui!");
    console.log("Respon server:", data);
  } catch (error) {
    console.error("Error:", error);
    alert("Gagal memperbarui ke server. Cek terminal backend!");
  }
};

  return (
    <div className="bg-[#F0FDF4] min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        
        {/* Foto Profil */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-32 h-32 bg-[#FFD54F] rounded-full overflow-hidden mb-4 border-2 border-gray-200">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">{user.nama_lengkap}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {/* Form Profil */}
        <div className="bg-[#C8E6C9] rounded-2xl p-8 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">Nama Lengkap</label>
              <input name="nama_lengkap" type="text" value={user.nama_lengkap} onChange={handleChange} className="w-full p-4 bg-white rounded-xl border-none outline-none focus:ring-2 focus:ring-[#206B3E]" />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">Email</label>
              <input name="email" type="email" value={user.email} onChange={handleChange} className="w-full p-4 bg-white rounded-xl border-none outline-none focus:ring-2 focus:ring-[#206B3E]" />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">Username</label>
              <input name="username" type="text" value={user.username} onChange={handleChange} className="w-full p-4 bg-white rounded-xl border-none outline-none focus:ring-2 focus:ring-[#206B3E]" />
            </div>
            <div className="flex justify-center pt-4">
              <button onClick={handleSave} className="bg-[#206B3E] text-white px-10 py-3 rounded-full text-lg font-medium hover:bg-[#1a5531] transition-all shadow-md">
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}