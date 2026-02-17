"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/services/api";
import ListColumn from "@/components/ListColumn";
import ActivitySidebar from "@/components/ActivitySidebar";
// --- MARKED CHANGE 1: Import the new ShareModal component ---
import ShareModal from "@/components/ShareModal"; 

import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { io } from "socket.io-client";

export default function BoardView() {
  const { id } = useParams();
  const [data, setData] = useState({ board: null, lists: [], tasks: [] });
  const [loading, setLoading] = useState(true);

  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  const [activities, setActivities] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // --- MARKED CHANGE 2: State to control Share Modal visibility ---
  const [isShareOpen, setIsShareOpen] = useState(false); 

  const [searchTerm, setSearchTerm] = useState("");

  async function fetchActivities() {
    try {
      const res = await apiFetch(`/activity/${id}`);
      setActivities(res);
    } catch (err) {
      console.error("Error fetching activity", err);
    }
  }

  async function createList() {
    if (!newListTitle.trim()) return;
    try {
      await apiFetch(`/lists`, {
        method: "POST",
        body: JSON.stringify({ title: newListTitle, boardId: id }),
      });
      setNewListTitle("");
      setIsAddingList(false);
      const socket = io("http://localhost:5000");
      socket.emit("joinBoard", id);
      socket.emit("boardUpdated", id);
      fetchBoardWorkspace();
    } catch (err) {
      console.error("Failed to create list", err);
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  async function fetchBoardWorkspace() {
    try {
      const board = await apiFetch(`/boards/${id}`);
      const lists = await apiFetch(`/lists?boardId=${id}`);
      const tasks = await apiFetch(`/tasks?boardId=${id}`);
      setData({ board, lists, tasks });
    } catch (err) {
      console.error("Workspace error", err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchBoardWorkspace();
      fetchActivities();
      const socket = io("http://localhost:5000");
      socket.on("connect", () => {
        socket.emit("joinBoard", id);
      });
      socket.on("boardUpdated", () => {
        fetchBoardWorkspace();
        fetchActivities();
      });
      return () => {
        socket.off("boardUpdated");
        socket.disconnect();
      };
    }
  }, [id]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const taskId = active.id;
    const newListId = over.data.current?.listId || over.id;
    try {
      await apiFetch("/tasks/move", {
        method: "PUT",
        body: JSON.stringify({
          taskId,
          newListId,
          newPosition: 0,
          boardId: id,
        }),
      });
      fetchBoardWorkspace();
    } catch (err) {
      console.error("Move failed", err);
    }
  };

  if (loading) return <div className="p-8 text-white bg-blue-600 h-screen font-bold">Loading board details...</div>;

  const filteredTasks = data.tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="h-screen flex-1 flex flex-col bg-[#F1F5F9] overflow-hidden">
        
        {/** Fixed Header */}
        <div className="flex-none p-4 bg-white flex items-center justify-between border-b border-slate-200 z-20 shadow-sm">
          <div className="flex items-center gap-6">
            <h1 className="text-slate-900 text-xl font-extrabold tracking-tight truncate">{data.board?.title}</h1>
            <input 
              type="text"
              placeholder="Search tasks..."
              className="bg-slate-100 text-slate-600 placeholder-slate-400 px-4 py-2 rounded-xl border border-transparent focus:bg-white focus:border-blue-500 outline-none transition w-64 text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-3 shrink-0">
            {/* --- MARKED CHANGE 3: Connected Share Modal to button --- */}
            <button 
              onClick={() => setIsShareOpen(true)}
              className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl font-bold hover:bg-slate-200 transition"
            >
              Share
            </button>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
            >
              History
            </button>
          </div>
        </div>

        {/** Scrollable Board Area */}
        <div className="flex-grow p-8 overflow-y-auto">
          <div className="flex flex-wrap gap-8 items-start justify-start">
            {data.lists.map((list) => (
              <div key={list._id} className="w-[320px] shrink-0">
                <ListColumn
                  list={list}
                  tasks={filteredTasks.filter((t) => t.listId == list._id)}
                  refreshData={fetchBoardWorkspace}
                  boardMembers={data.board?.members}
                />
              </div>
            ))}

            <div className="w-[320px] shrink-0 pb-20">
              {isAddingList ? (
                <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-200 animate-in fade-in zoom-in duration-200">
                  <input
                    autoFocus
                    className="w-full p-2.5 rounded-lg border-2 border-blue-100 focus:border-blue-500 text-slate-800 mb-3 outline-none transition"
                    placeholder="List Title..."
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && createList()}
                  />
                  <div className="flex gap-2">
                    <button onClick={createList} className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition">Add List</button>
                    <button onClick={() => setIsAddingList(false)} className="px-3 text-slate-400 hover:text-slate-600 font-bold">✕</button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsAddingList(true)}
                  className="w-full bg-slate-200/50 hover:bg-slate-200 text-slate-600 font-bold p-4 rounded-2xl border-2 border-dashed border-slate-300 transition-all text-center"
                >
                  + Add another list
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Modals and Sidebars */}
        <ActivitySidebar activities={activities} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        {/* --- MARKED CHANGE 4: Place ShareModal at bottom of JSX --- */}
        <ShareModal 
          boardId={id} 
          isOpen={isShareOpen} 
          onClose={() => setIsShareOpen(false)} 
        />
      </div>
    </DndContext>
  );
}