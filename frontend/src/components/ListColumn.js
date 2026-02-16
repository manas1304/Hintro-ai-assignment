"use client";
import { useState } from "react";
import { apiFetch } from "@/services/api";

export default function ListColumn({ list, tasks, refreshData }) {

    const [isAdding, setIsAdding] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");

    async function handleAddTask(e){
        e.preventDefault();
        if(!taskTitle.trim()) return;

        try{

            await apiFetch('/tasks', {
                method: "POST",
                body: JSON.stringify({
                    title: taskTitle,
                    boardId: list.boardId,
                    listId: list._id,
                    position: tasks.length
                })
            })
            setTaskTitle("");
            setIsAdding(false);
            refreshData();

        }catch(err){
            alert("Error adding task: " + err.message);
        }
    }

  return (
    <div className="bg-gray-100 min-w-[280px] max-w-[280px] rounded-lg p-3 flex flex-col max-h-full shadow-sm">
      
      <h2 className="font-bold text-gray-800 px-2 mb-3 text-sm uppercase tracking-wide">
        {list.title}
      </h2>

      
      <div className="flex-grow overflow-y-auto space-y-2 mb-3">
        {tasks.map((task) => (
          <div 
            key={task._id} 
            className="bg-white p-3 rounded shadow-sm border border-gray-200 text-gray-900 text-sm hover:border-blue-400 cursor-pointer transition"
          >
            {task.title}
          </div>
        ))}
      </div>

      {/* Inline Form Logic */}
      {isAdding ? (
        <form onSubmit={handleAddTask} className="space-y-2">
          <textarea
            autoFocus
            className="w-full p-2 rounded border border-blue-400 text-gray-900 text-sm focus:outline-none bg-white"
            placeholder="Enter a title for this card..."
            rows="2"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
              Add card
            </button>
            <button type="button" onClick={() => setIsAdding(false)} className="text-gray-500 hover:text-gray-800 text-sm font-bold">
              X
            </button>
          </div>
        </form>
      ) : (
        <button 
          onClick={() => setIsAdding(true)}
          className="text-gray-600 hover:bg-gray-200 p-2 rounded-md text-sm text-left transition"
        >
          + Add a card
        </button>
      )}
    </div>
  );
}