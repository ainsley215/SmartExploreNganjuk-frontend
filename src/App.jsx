import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Favorite from "./pages/Favorite"
import HalamanProfil from './pages/HalamanProfil';
import Destination from "./pages/Destination"
import DestinationDetail from "./pages/DestinationDetail"
import MapPage from "./pages/MapPage"
import History from "./pages/History"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/destinasi" element={<Destination />} />
      <Route path="/destination/:id" element={<DestinationDetail />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/profil" element={<HalamanProfil />} />
      <Route path="/riwayat" element={<History />} />
      <Route path="/peta" element={<MapPage />} />
    </Routes>
  )
}

export default App