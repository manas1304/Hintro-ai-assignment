"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { apiFetch } from "@/services/api";

// MARKED CHANGE 1: Added boardMembers prop
export default function TaskCard({ task, boardMembers = [] }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: { listId: task.listId },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDelete = async () => {
    if (!confirm("Delete this task?")) return;
    await apiFetch(`/tasks/${task._id}?boardId=${task.boardId}`, {
      method: "DELETE",
    });
  };

  const handleUpdate = async () => {
    await apiFetch(`/tasks/${task._id}`, {
      method: "PUT",
      body: JSON.stringify({ title: newTitle, boardId: task.boardId }),
    });
    setIsEditing(false);
  };


  const handleAssignMember = async (userId) => {
    if (!userId) return;
    try {
      await apiFetch(`/tasks/${task._id}/assign`, {
        method: "POST",
        body: JSON.stringify({ userId, boardId: task.boardId }),
      });
      if(typeof refreshData === 'function') refreshData();
    } catch (err) {
      console.error("Assignment failed", err);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-3 rounded-xl group shadow-sm mb-2 cursor-grab active:cursor-grabbing border border-gray-200 hover:border-blue-400 transition-all"
    >
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            className="border-2 border-blue-100 rounded-lg p-2 text-sm text-black outline-none focus:border-blue-500"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg font-bold"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-xs bg-gray-100 text-gray-500 px-3 py-1.5 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <p
              {...attributes}
              {...listeners}
              className="text-slate-700 text-sm font-medium cursor-grab flex-grow"
            >
              {task.title}
            </p>
            <div className="hidden group-hover:flex gap-2 ml-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-slate-400 hover:text-blue-500 text-xs"
              >
                ✎
              </button>
              <button
                onClick={handleDelete}
                className="text-slate-400 hover:text-red-500 text-xs"
              >
                🗑
              </button>
            </div>
          </div>

          <div className="relative mt-3 pt-3 border-t border-slate-100">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">
              Assigned To
            </label>
            <select
              className="w-full bg-slate-50 text-slate-600 text-xs font-semibold py-2 px-3 rounded-lg border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer hover:bg-white"
              onChange={(e) => handleAssignMember(e.target.value)}
              value={task.assignees?.[0]?._id || task.assignees?.[0] || ""}
            >
              <option value="" disabled className="text-slate-400">
                Assign member...
              </option>
              {/* Logic Check: Ensure member exists and has a name/email */}
              {boardMembers && boardMembers.length > 0 ? (
                boardMembers.map((member) => (
                  <option
                    key={member._id || member}
                    value={member._id}
                    className="text-black bg-white py-2" // Force dark text and white bg
                  >
                    {typeof member === 'object' ? (member.name || member.email) : "User ID: " + member.substring(0,5) + "..."}
                  </option>
                ))
              ) : (
                <option disabled className="text-slate-400">
                  No members found
                </option>
              )}
            </select>

            {task.assignees?.length > 0 && (
              <div className="flex -space-x-2">
                <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-[8px] text-white border border-white">
                  {task.assignees.length}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
