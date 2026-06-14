import Navbar from "../components/Navbar"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#E6F0E5] p-10">
        <h1 className="text-5xl font-bold">Peta Wisata</h1>

        {/* Kotak Putih ini sekarang berisi Peta */}
        <div className="bg-white rounded-3xl mt-8 h-[500px] overflow-hidden shadow-lg">
          <MapContainer 
            center={[-7.60, 111.95]} // Koordinat tengah Nganjuk
            zoom={12} 
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
              attribution='&copy; OpenStreetMap contributors'
            />
            {/* Di sini nanti kamu bisa map data lokasi dari API atau file JSON */}
            <Marker position={[-7.60, 111.95]}>
              <Popup>Selamat Datang di Nganjuk!</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </>
  )
}

export default MapPage