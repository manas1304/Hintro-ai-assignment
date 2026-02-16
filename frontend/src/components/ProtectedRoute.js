"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Not having a token redirects to login.
    } else {
      setIsAuth(true); // Token exists - Show content.
    }
  }, [router]);

  if (!isAuth)
    return (
      <div className="p-8 bg-gray-100 min-h-screen text-black">
        Verifying Session...
      </div>
    );

  return <>{children}</>;
}
