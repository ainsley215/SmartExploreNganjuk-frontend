import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// MEMPERBAIKI MASALAH IKON MARKER DEFAULT LEAFLET
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapSection() {
  const locations = [
    { id: 1, name: "Jolotundo Glamping", lat: -7.6, lng: 111.9 },
    { id: 2, name: "Taman Nyawiji", lat: -7.5, lng: 111.8 }
  ];

  return (
    <section id="peta" className="bg-[#E6F0E5] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8">Peta Lokasi</h2>
        
        {/* Kontainer Peta dengan tinggi yang didefinisikan */}
        <div className="rounded-3xl overflow-hidden h-[350px] shadow-lg">
          <MapContainer 
            center={[-7.6, 111.9]} 
            zoom={12} 
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
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

export default MapSection;