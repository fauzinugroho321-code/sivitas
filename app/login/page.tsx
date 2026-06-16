"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "../actions/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await loginUser(username, password);
      if (!res.success) {
        setError(res.error);
        return;
      }

      // on success, redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError("Terjadi kesalahan pada server");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 relative"
      style={{
        backgroundImage: "url('/background-login.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#ecfdf5',
      }}
    >
      <Link href="/" className="absolute top-4 left-4 z-10 text-gray-700 hover:text-green-700">← Kembali ke Beranda</Link>
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Masuk ke SIVITAS</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">NIK / Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Masukkan NIK atau username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Masukkan password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Masuk
          </button>

          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Belum punya akun? <Link href="/register" className="text-green-600">Daftar</Link>
        </p>
      </div>
    </div>
  );
}
