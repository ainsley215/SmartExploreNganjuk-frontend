# Smart Explore Nganjuk - Frontend

Frontend aplikasi wisata Nganjuk yang dibangun menggunakan React, Vite, dan Tailwind CSS.

## Fitur
- UI/UX modern dengan Tailwind CSS.
- Pencarian dan filter destinasi berbasis AI.
- Sistem favorit (Favorites) yang tersimpan di LocalStorage.
- Integrasi dengan Backend API Python (Flask).

## Prasyarat
- [Node.js](https://nodejs.org/) (versi 18 ke atas disarankan)
- npm atau yarn

## Instalasi & Cara Menjalankan
1. Clone repository ini.
2. Masuk ke folder proyek: `cd nama-folder-repo`
3. Install dependencies:
   ```bash
   npm install
Jalankan aplikasi di development mode:

Bash
npm run dev
Buka http://localhost:5173 di browser kamu.

Deployment (Vercel)
Aplikasi ini di-deploy di Vercel. Pastikan file vercel.json sudah ada di root folder untuk menangani routing SPA:

JSON
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
