import { useState } from "react";
import { apiFetch } from "@/services/api";

export default function ShareModal({ boardId, isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleShare = async () => {
    setLoading(true);
    try {
      await apiFetch("/boards/add-member", {
        method: "POST",
        body: JSON.stringify({ boardId, email }),
      });
      alert("Member added!");
      setEmail("");
      onClose();
    } catch (err) {
      alert(err.message || "Failed to add member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Share Board</h2>
        <p className="text-slate-500 mb-6">
          Invite someone to collaborate by entering their email address.
        </p>

        <input
          type="email"
          placeholder="user@example.com"
          className="w-full p-3 border border-slate-200 rounded-xl mb-6 outline-none focus:border-blue-500 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={handleShare}
            disabled={loading}
            className="flex-1 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Inviting..." : "Send Invite"}
          </button>
        </div>
      </div>
    </div>
  );
}
