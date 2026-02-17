"use client";
import { useState, useEffect } from "react";
import { apiFetch } from "@/services/api";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");

  async function getBoards() {
    try {
      const data = await apiFetch("/boards");
      setBoards(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBoards();
  }, []);

  async function handleCreateBoard(e) {
    e.preventDefault();
    try {
      await apiFetch("/boards", {
        method: "POST",
        body: JSON.stringify({ title: newBoardTitle }),
      });
      setNewBoardTitle("");
      setIsModalOpen(false);
      getBoards();
    } catch (err) {
      alert("Failed to create board: " + err.message);
    }
  }

  if (loading) return <div className="p-8 text-slate-600 font-bold">Loading boards...</div>;

  return (
    <ProtectedRoute>
      
      <div className="min-h-screen bg-[#F8FAFC] p-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Boards</h1>
          <button
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 active:scale-95"
            onClick={() => setIsModalOpen(true)}
          >
            + New Board
          </button>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {boards.map((board) => (
            <Link href={`/dashboard/board/${board._id}`} key={board._id}>
              <div
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <span className="text-blue-600 group-hover:text-white font-bold text-xl">#</span>
                </div>
                <h3 className="font-bold text-xl text-slate-800">
                  {board.title}
                </h3>
                <p className="text-slate-400 text-sm mt-2">Manage your workflow</p>
              </div>
            </Link>
          ))}
        </div>

        
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in zoom-in duration-300">
              <h2 className="text-2xl font-extrabold mb-6 text-slate-900 tracking-tight">
                Create New Board
              </h2>
              <form onSubmit={handleCreateBoard}>
                <div className="mb-6">
                  <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">Board Title</label>
                  <input
                    autoFocus
                    type="text"
                    placeholder="e.g. Project Roadmap"
                    className="w-full border-2 border-slate-100 p-3.5 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 transition-all placeholder:text-slate-300"
                    value={newBoardTitle}
                    onChange={(e) => setNewBoardTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-95 transition"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}