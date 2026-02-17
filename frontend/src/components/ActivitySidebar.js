import React from 'react';

export default function ActivitySidebar({ activities, isOpen, onClose }) {
  
  if (!isOpen) return null;

  return (
    <>
      
      <div 
        className="fixed inset-0 bg-black/20 z-40 transition-opacity" 
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col border-l border-gray-200 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span>🕒</span> Activity History
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-black hover:bg-gray-200 p-1 rounded-full transition text-xl"
          >
            ✕
          </button>
        </div>

        {/* Activity List */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {activities.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 italic">No activity recorded yet.</p>
            </div>
          ) : (
            activities.map((activity) => (
              <div key={activity._id} className="flex flex-col border-b border-gray-50 pb-3 last:border-0">
                <div className="flex items-start gap-2">
                  <div className="min-w-[8px] h-2 w-2 rounded-full bg-blue-500 mt-1.5" />
                  <p className="text-sm text-gray-700 leading-snug">
                    <span className="font-semibold text-blue-600">
                      {activity.userEmail?.split('@')[0] || "A user"}
                    </span>{" "}
                    {activity.action}
                  </p>
                </div>
                <span className="text-[10px] text-gray-400 ml-4 mt-1 font-medium uppercase tracking-wider">
                  {new Date(activity.createdAt).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}