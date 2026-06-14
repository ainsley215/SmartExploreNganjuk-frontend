import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer id="tentang" className="bg-white py-12 border-t scroll-mt-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-10">

          <div>
            <h3 className="font-bold text-xl">
              Smart Explore Nganjuk
            </h3>
          </div>

          <div>
            <h4 className="font-semibold mb-3">
              Jelajahi
            </h4>

            <ul className="space-y-2 text-gray-600">
              <li>Semua Destinasi</li>
              <li>Lokasi Destinasi</li>
              <li>Kategori</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">
              Akun
            </h4>

            <ul className="space-y-2 text-gray-600">
              <li>Profil Saya</li>
              <li>Tempat Favorit</li>
              <li>Riwayat Kunjungan</li>
            </ul>
          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer