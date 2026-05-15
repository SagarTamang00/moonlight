import { useState } from "react";
import useTeamCategories from "../hooks/useTeamCategories";
import { createTeamCategory, deleteTeamCategory } from "../api/teamCategories";
import PopupModal from "./PopupModal";

const AdminTeamCategories = ({ categories, onUpdate }) => {
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [modal, setModal] = useState({ isOpen: false, type: "alert", title: "", message: "", onConfirm: null });

    const showModal = (type, title, message, onConfirm = null) => {
        setModal({ isOpen: true, type, title, message, onConfirm });
    };

    const closeModal = () => setModal(prev => ({ ...prev, isOpen: false }));

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        setIsSubmitting(true);
        try {
            await createTeamCategory({ name: name.trim() });
            setName("");
            if (onUpdate) onUpdate();
        } catch (err) {
            console.log(err);
            showModal("alert", "Error", "Failed to add category");
        } finally {
            setIsSubmitting(false);
        }
    };

    const confirmDelete = (id) => {
        showModal(
            "delete",
            "Delete Category",
            "Are you sure you want to delete this category? This action cannot be undone.",
            () => executeDelete(id)
        );
    };

    const executeDelete = async (id) => {
        closeModal();
        try {
            await deleteTeamCategory(id);
            if (onUpdate) onUpdate();
        } catch (err) {
            console.log(err);
            showModal("alert", "Error", "Failed to delete category");
        }
    };

    if (!categories) return null;

    return (
        <div className="mb-8 relative">
            <PopupModal 
                {...modal} 
                onCancel={closeModal} 
                onConfirm={() => {
                    if (modal.onConfirm) modal.onConfirm();
                    else closeModal();
                }} 
            />

            {/* Header */}
            <div className="mb-4">
                <h3 className="text-base font-medium text-black dark:text-white">
                    Team categories
                </h3>
                <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-0.5">
                    Add or remove categories for your team
                </p>
            </div>

            {/* Add row */}
            <form onSubmit={handleAdd} className="flex gap-2 mb-4">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Category name…"
                    className="flex-1 h-9 px-3 text-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-colors"
                />
                <button
                    type="submit"
                    disabled={!name.trim() || isSubmitting}
                    className="h-9 px-4 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-lg transition-opacity disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80"
                >
                    {isSubmitting ? "Adding…" : "Add"}
                </button>
            </form>

            {/* List */}
            {categories.length === 0 ? (
                <div className="py-8 text-center text-sm text-neutral-400 dark:text-neutral-600 border border-neutral-100 dark:border-neutral-800 rounded-xl">
                    No categories yet
                </div>
            ) : (
                <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                    {categories.map((cat, i) => (
                        <div
                            key={cat.id}
                            className={`flex items-center justify-between px-4 py-3 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group ${i !== categories.length - 1 ? "border-b border-neutral-100 dark:border-neutral-800" : ""}`}
                        >
                            <span className="text-sm text-black dark:text-white">
                                {cat.name}
                            </span>
                            <button
                                onClick={() => confirmDelete(cat.id)}
                                aria-label={`Delete ${cat.name}`}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-500 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 hover:border-red-200 dark:hover:border-red-900 transition-all"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminTeamCategories;