import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapSection() {
  // Contoh data titik lokasi wisata
  const locations = [
    { id: 1, name: "Jolotundo Glamping", lat: -7.6, lng: 111.9 },
    { id: 2, name: "Taman Nyawiji", lat: -7.5, lng: 111.8 }
  ];

  return (
    <section id="peta" className="bg-[#E6F0E5] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8">Peta Lokasi</h2>
        
        {/* Peta akan mengisi kontainer ini */}
        <div className="rounded-3xl overflow-hidden h-[350px]">
          <MapContainer center={[-7.6, 111.9]} zoom={12} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            {locations.map((loc) => (
              <Marker key={loc.id} position={[loc.lat, loc.lng]}>
                <Popup>{loc.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  )
}