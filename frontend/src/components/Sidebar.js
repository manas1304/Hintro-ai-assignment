"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login"; 
  };

  return (
    // MARKED CHANGE 1: Switched bg-white to bg-blue-600 and text-slate-600 to text-white
    <div className="w-64 h-screen bg-blue-600 text-white flex flex-col p-6 fixed left-0 top-0 z-30 shadow-xl">
      
      {/* MARKED CHANGE 2: text-blue-600 to text-white */}
      <h2 className="text-2xl font-extrabold mb-10 text-white tracking-tight">
        TaskFlow
      </h2>
      
      <nav className="flex-grow space-y-2">
        <Link 
          href="/dashboard" 
          // MARKED CHANGE 3: Updated active state colors for better contrast on blue bg
          className={`flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
            pathname === "/dashboard" 
            ? "bg-white/20 text-white shadow-md" 
            : "bg-white/20 text-white shadow-md hover:bg-white/30"
          }`}
        >
          <span>📊</span> Dashboard
        </Link>
      </nav>

      {/* MARKED CHANGE 4: Logout styling updated to transparent white glassmorphism */}
      <button 
        onClick={handleLogout}
        className="mt-auto w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold transition-all border border-white/20 active:scale-95"
      >
        <span>🚪</span> Logout
      </button>
    </div>
  );
}