import { Link, useNavigate } from "react-router-dom"
import { HashLink } from "react-router-hash-link"

function Navbar() {
  const navigate = useNavigate()

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true"

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  )

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")

    navigate("/")
    window.location.reload()
  }

  return (
    <nav className="bg-[#206B3E] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to={isLoggedIn ? "/" : "/"}
          className="text-xl font-bold"
        >
          Smart Explore Nganjuk
        </Link>

        {/* Menu */}
        <div className="hidden md:flex gap-8 items-center">

          <HashLink
            smooth
            to="/#"
            className="hover:text-green-200 transition"
          >
            Beranda
          </HashLink>

          <Link
            to="/destinasi"
            className="hover:text-green-200 transition"
          >
            Destinasi
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/favorite"
                className="hover:text-green-200 transition"
              >
                Favorit
              </Link>

              <Link
                to="/riwayat"
                className="hover:text-green-200 transition"
              >
                Riwayat
              </Link>

              <Link
                to="/peta"
                className="hover:text-green-200 transition"
              >
                Peta Wisata
              </Link>
            </>
          )}

          <HashLink
            smooth
            to="/#tentang"
            className="hover:text-green-200 transition"
          >
            Tentang
          </HashLink>

        </div>

        {/* User Area */}
        <div className="flex items-center gap-3">

          {isLoggedIn ? (
            <>
              <div className="hidden md:block text-sm">
                Halo, <span className="font-semibold">{user?.username}</span>
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-green-800 transition"
              >
                Masuk
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-white text-green-800 rounded-lg font-medium hover:bg-green-100 transition"
              >
                Daftar
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  )
}

export default Navbar