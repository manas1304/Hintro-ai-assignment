"use client";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        {/* ml-64 adds margin so the content doesn't hide behind the fixed sidebar */}
        <main className="flex-grow ml-64 min-h-screen bg-gray-50">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}