"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    window.location.href = "/login"; // This clears all react states
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4 fixed left-0 top-0">
      <h2 className="text-2xl font-bold mb-8 text-blue-400">Hintro.ai</h2>
      
      <nav className="flex-grow space-y-4">
        <Link href="/dashboard" className="block p-2 hover:bg-gray-800 rounded transition">
          Dashboard
        </Link>
        {/* You can map through recent boards here later */}
      </nav>

      <button 
        onClick={handleLogout}
        className="mt-auto w-full bg-red-600 hover:bg-red-700 py-2 rounded font-semibold transition"
      >
        Logout
      </button>
    </div>
  );
}