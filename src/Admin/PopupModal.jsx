import React from "react";

const PopupModal = ({ isOpen, type = "alert", title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-[fadeIn_0.2s_ease-out]">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type === "alert" ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500" : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500"}`}>
            {type === "alert" ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H2.25" />
              </svg>
            )}
          </div>
          <h3 className="text-lg font-bold text-black dark:text-white">
            {title}
          </h3>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
          {message}
        </p>

        <div className="flex items-center justify-end gap-3">
          {(type === "confirm" || type === "delete") && (
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg text-sm font-medium text-black dark:text-white bg-gray-100 hover:bg-gray-200 dark:bg-[#222] dark:hover:bg-[#333] transition-colors"
            >
              Cancel
            </button>
          )}
          
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
              type === "alert" || type === "delete" 
                ? "bg-red-600 hover:bg-red-700" 
                : "bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            }`}
          >
            {type === "alert" ? "Okay" : (type === "delete" ? "Delete" : "Confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
