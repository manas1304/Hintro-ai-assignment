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
  }, []); // Empty dependency array means runs once when the component loads.

  async function handleCreateBoard(e) {
    e.preventDefault();
    try {
      await apiFetch("/boards", {
        method: "POST",
        body: JSON.stringify({ title: newBoardTitle }),
      });
      setNewBoardTitle("");
      setIsModalOpen(false);
      getBoards(); // To refresh the list after creating a newBoard
    } catch (err) {
      alert("Failed to create board: " + err.message);
    }
  }

  if (loading) return <div className="p-8">Loading boards...</div>;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Boards</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => setIsModalOpen(true)} // So that the modal opens up on the screen
          >
            + New Board
          </button>
        </div>

        {/* Boards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {boards.map((board) => (
            <Link href={`/board/${board._id}`} key={board._id}>
              <div
                key={board._id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg text-gray-700">
                  {board.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Create New Board
              </h2>
              <form onSubmit={handleCreateBoard}>
                <input
                  type="text"
                  placeholder="Board Title"
                  className="w-full border p-2 rounded-md mb-4 focus:outline-none focus:border-blue-500"
                  value={newBoardTitle}
                  onChange={(e) => setNewBoardTitle(e.target.value)} // Updates the title for the newBoard
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)} // To close the modal when user Submits
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
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
