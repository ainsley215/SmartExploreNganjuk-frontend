import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const savedUserRaw = localStorage.getItem("user");
    console.log("Data dari LocalStorage:", savedUserRaw); // TAMBAHKAN INI

    if (!savedUserRaw) {
      setError("Belum ada akun terdaftar. Silakan Daftar terlebih dahulu.");
      return;
    }

    const savedUser = JSON.parse(savedUserRaw);
    console.log("Objek User:", savedUser); // TAMBAHKAN INI

    if (savedUser.username === username && savedUser.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      setError("Username atau Password salah!");
    }
  }

  return (
    <div className="min-h-screen bg-[#E6F0E5] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Masuk</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-4"
        />

        <button type="submit" className="w-full bg-[#206B3E] text-white py-3 rounded-xl hover:bg-green-800 transition">
          Masuk
        </button>

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </form>
    </div>
  )
}

export default Login