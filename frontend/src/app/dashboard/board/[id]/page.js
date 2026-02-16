"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/services/api";
import ListColumn from "@/components/ListColumn";

export default function BoardView() {
  const { id } = useParams(); // To get the id from the URL ex - /board/123
  const [data, setData] = useState({ board: null, lists: [], tasks: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBoardWorkspace() {
      try {
        const board = await apiFetch(`/boards/${id}`);
        const lists = await apiFetch(`/lists?boardId=${id}`);
        const tasks = await apiFetch(`/tasks?boardId=${id}`);

        setData({ board, lists, tasks });
      } catch (err) {
        console.erro("Workspace error", err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchBoardWorkspace();
  }, [id]); // Runs once initially then only runs when the id is changed in the URL

  if (loading) return <div className="p-8">Loading board details...</div>;

  return (
    <div className="h-screen flex flex-col bg-blue-600">
        {/**Board Header */}
      <div className="p-4 bg-black bg-opacity-10 flex items-center justify-between">
        <h1 className="text-white text-xl font-bold">{data.board?.title}</h1>
        <button className="bg-white bg-opacity-20 text-white px-3 py-1 rounded hover:bg-opacity-30">
          Share
        </button>
      </div>

      {/**Board Content ( Horizontal Scroll ) */}
        <div className="flex-grow p-4 flex gap-4 overflow-x-auto items-start">
            {
                data.lists.map((list) =>(
                    <ListColumn 
                        key={list._id}
                        list={list}
                        tasks={data.tasks.filter(t => t.listId == list._id)}
                        refreshData={fetchBoardWorkspace}
                    />
                ))
            }
            <button className="bg-white bg-opacity-20 text-white p-3 rounded-lg min-w-[280px] text-left hover:bg-opacity-30 transition">
                + Add another list
            </button>
        </div>
    </div>
  );
}
