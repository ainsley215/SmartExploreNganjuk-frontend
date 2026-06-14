import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleRegister = (e) => {
  e.preventDefault()

  if (!username || !password || !confirmPassword) {
    setMessage("Semua field wajib diisi!")
    return
  }

  if (password !== confirmPassword) {
    setMessage("Password dan Konfirmasi Password tidak sama!")
    return
  }

  const user = {
    username,
    password,
  }

  localStorage.setItem("user", JSON.stringify(user))

  console.log(localStorage.getItem("user")) // cek

  navigate("/")
}

  return (
    <div className="min-h-screen bg-[#E6F0E5] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Daftar Akun
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="password"
            placeholder="Konfirmasi Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            className="w-full bg-[#206B3E] text-white py-3 rounded-xl hover:bg-green-800 transition"
          >
            Daftar
          </button>

        </form>

        {message && (
          <p className="mt-4 text-center text-red-500">
            {message}
          </p>
        )}

      </div>
    </div>
  )
}

export default Register