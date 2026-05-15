import { useState, useRef } from "react";
import useTeamMembers from "../hooks/useTeamMembers";
import useTeamCategories from "../hooks/useTeamCategories";
import { createTeamMember, updateTeamMember, deleteTeamMember } from "../api/teamMembers";
import AdminTeamLinks from "./AdminTeamLinks";
import AdminTeamCategories from "./AdminTeamCategories";
import PopupModal from "./PopupModal";
import { BASE_URL } from "../utils/api";

/* ─── Icons ──────────────────────────────────────────────── */
const Icon = {
    user: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
    ),
    tag: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
        </svg>
    ),
    briefcase: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
        </svg>
    ),
    camera: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
        </svg>
    ),
    trash: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
    ),
    edit: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.89 1.14l-2.815.938.938-2.815a4.5 4.5 0 011.14-1.89l12.657-12.657z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.125L16.875 4.5" />
        </svg>
    ),
    plus: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    ),
    users: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
    ),
};

/* ─── Form Field ─────────────────────────────────────────── */
const Field = ({ label, name, type = "text", value, onChange, placeholder, as = "input", children, icon }) => (
    <div className="flex flex-col gap-1.5 w-full">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            {icon && <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">{icon}</span>}
            {label}
        </label>
        {as === "select" ? (
            <div className="relative">
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full appearance-none rounded-lg border-2 border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#111] px-4 py-3 pr-10 text-base text-gray-900 dark:text-white outline-none transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 focus:border-black dark:focus:border-white focus:ring-4 focus:ring-black/5 dark:focus:ring-white/10"
                >
                    {children}
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
        ) : (
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-lg border-2 border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#111] px-4 py-3 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 focus:border-black dark:focus:border-white focus:ring-4 focus:ring-black/5 dark:focus:ring-white/10"
            />
        )}
    </div>
);

/* ─── Member Card ────────────────────────────────────────── */
const MemberCard = ({ member, onDelete, onEdit }) => {
    const initials = member.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

    return (
        <div className="w-full bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#2a2a2a] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-4 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all duration-200 group">
            <div className="flex items-start gap-4 w-full">
                {member.image ? (
                    <img
                        src={`${BASE_URL}${member.image}`}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover flex-shrink-0 ring-2 ring-gray-100 dark:ring-[#2a2a2a] group-hover:ring-gray-300 dark:group-hover:ring-gray-600 transition-all"
                        alt={member.name}
                    />
                ) : (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gray-100 dark:bg-[#222] flex items-center justify-center flex-shrink-0 ring-2 ring-gray-100 dark:ring-[#2a2a2a] text-lg font-bold text-gray-500 dark:text-gray-400">
                        {initials}
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                            <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">{member.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2 break-words">{member.description}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                            <button
                                onClick={() => onEdit(member)}
                                className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 dark:border-[#333] text-gray-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-150"
                                title="Edit member"
                            >
                                {Icon.edit}
                            </button>
                            <button
                                onClick={() => onDelete(member.id)}
                                className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 dark:border-[#333] text-gray-400 hover:border-red-300 dark:hover:border-red-800 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-150"
                                title="Delete member"
                            >
                                {Icon.trash}
                            </button>
                        </div>
                    </div>

                    {member.category_name && (
                        <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-[#252525] text-xs font-semibold text-gray-600 dark:text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                            {member.category_name}
                        </span>
                    )}

                    <div className="mt-3">
                        <AdminTeamLinks memberId={member.id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ─── Main Component ─────────────────────────────────────── */
const AdminTeam = () => {
    const { members, loading, refetch } = useTeamMembers();
    const { categories, refetch: refetchCategories } = useTeamCategories();

    const [form, setForm] = useState({ category_id: "", name: "", description: "", image: null });
    const [imagePreview, setImagePreview] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [editId, setEditId] = useState(null);

    // ── Scroll & highlight refs ──
    const formRef = useRef(null);
    const [highlightForm, setHighlightForm] = useState(false);

    const [modal, setModal] = useState({ isOpen: false, type: "alert", title: "", message: "", onConfirm: null });

    const showModal = (type, title, message, onConfirm = null) =>
        setModal({ isOpen: true, type, title, message, onConfirm });

    const closeModal = () => setModal(prev => ({ ...prev, isOpen: false }));

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleFile = (file) => {
        if (!file) return;
        setForm({ ...form, image: file });
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("category_id", form.category_id);
        formData.append("name", form.name);
        formData.append("description", form.description);
        if (form.image instanceof File) formData.append("image", form.image);

        try {
            if (editId) {
                await updateTeamMember(editId, formData);
            } else {
                await createTeamMember(formData);
            }
            setForm({ category_id: "", name: "", description: "", image: null });
            setImagePreview(null);
            setEditId(null);
            setSuccessMsg(true);
            setTimeout(() => setSuccessMsg(false), 3000);
            refetch();
        } catch (err) {
            console.log(err);
            showModal("alert", "Error", `Failed to ${editId ? "update" : "add"} member`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditClick = (member) => {
        setForm({
            category_id: member.category_id || "",
            name: member.name || "",
            description: member.description || "",
            image: null
        });
        setImagePreview(member.image ? `${BASE_URL}${member.image}` : null);
        setEditId(member.id);

        // Scroll to form and flash highlight
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            setHighlightForm(true);
            setTimeout(() => setHighlightForm(false), 1500);
        }, 50);
    };

    const handleCancelEdit = () => {
        setForm({ category_id: "", name: "", description: "", image: null });
        setImagePreview(null);
        setEditId(null);
    };

    const confirmDelete = (id) => {
        showModal(
            "delete",
            "Delete Member",
            "Are you sure you want to delete this team member? This action cannot be undone.",
            () => executeDelete(id)
        );
    };

    const executeDelete = async (id) => {
        closeModal();
        try {
            await deleteTeamMember(id);
            refetch();
        } catch (err) {
            console.log(err);
            showModal("alert", "Error", "Delete failed");
        }
    };

    if (loading)
        return (
            <div className="flex h-full w-full items-center justify-center bg-gray-50 dark:bg-[#0d0d0d]">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                            <span key={i} className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                        ))}
                    </div>
                    <p className="text-sm font-medium text-gray-400">Loading team…</p>
                </div>
            </div>
        );

    return (
        <div className="flex flex-col h-full w-full overflow-hidden bg-gray-50 dark:bg-[#0d0d0d] transition-colors duration-300 relative">
            <PopupModal
                {...modal}
                onCancel={closeModal}
                onConfirm={() => {
                    if (modal.onConfirm) modal.onConfirm();
                    else closeModal();
                }}
            />

            {/* ── Top Bar ── */}
            <header className="flex-shrink-0 w-full bg-white dark:bg-[#181818] border-b border-gray-200 dark:border-[#2a2a2a]">
                <div className="w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        {Icon.users}
                        <span className="font-medium">Team</span>
                    </div>
                    <div className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold transition-all duration-300 ${successMsg
                        ? "opacity-100 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                        : "opacity-0 pointer-events-none"
                        }`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Member {editId ? "updated" : "added"}!
                    </div>
                </div>
            </header>

            {/* ── Scrollable Body ── */}
            <div className="flex-1 min-h-0 overflow-y-auto">
                <div className="w-full max-w-6xl mx-auto px-6 pt-8 pb-12">

                    <div className="mb-8">
                        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Team Members</h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Add, manage, and organize your team members and their roles.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* ── Left: Forms ── */}
                        <div className="lg:col-span-4 lg:sticky lg:top-6 flex flex-col gap-5">

                            {/* Categories */}
                            <div className="w-full rounded-2xl border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#181818] p-6 shadow-sm">
                                <AdminTeamCategories categories={categories} onUpdate={refetchCategories} />
                            </div>

                            {/* Add/Edit Member Form — ref + highlight here */}
                            <div
                                ref={formRef}
                                className={`w-full rounded-2xl border bg-white dark:bg-[#181818] p-6 shadow-sm transition-all duration-500 ${highlightForm
                                    ? "border-blue-400 dark:border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/40"
                                    : "border-gray-200 dark:border-[#2a2a2a]"
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100 dark:border-[#252525]">
                                    <div className="flex items-center gap-3">
                                        <span className={`flex h-7 w-7 items-center justify-center rounded-full text-white dark:text-black text-xs font-bold flex-shrink-0 transition-colors ${editId ? "bg-blue-500" : "bg-black dark:bg-white"}`}>
                                            {editId ? Icon.edit : "+"}
                                        </span>
                                        <h2 className="text-base font-bold text-gray-900 dark:text-white">
                                            {editId ? "Edit Member" : "Add Member"}
                                        </h2>
                                    </div>
                                    {editId && (
                                        <button
                                            onClick={handleCancelEdit}
                                            className="text-xs font-semibold text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                    {/* Photo Upload */}
                                    <div
                                        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                        onDragLeave={() => setDragging(false)}
                                        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
                                        onClick={() => document.getElementById("team-image-input").click()}
                                        className={`relative cursor-pointer rounded-xl border-2 border-dashed p-6 flex flex-col items-center justify-center gap-3 transition-all duration-200 select-none ${dragging
                                            ? "border-black dark:border-white bg-black dark:bg-white"
                                            : "border-gray-300 dark:border-[#333] bg-gray-50 dark:bg-[#111] hover:border-gray-500 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-[#1c1c1c]"
                                            }`}
                                    >
                                        <input id="team-image-input" type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
                                        {imagePreview ? (
                                            <>
                                                <img src={imagePreview} alt="preview" className="w-16 h-16 object-cover rounded-full ring-2 ring-gray-200 dark:ring-[#333]" />
                                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Click to replace</p>
                                            </>
                                        ) : (
                                            <>
                                                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${dragging ? "bg-white/20 dark:bg-black/20" : "bg-white dark:bg-[#222] border-2 border-gray-200 dark:border-[#333]"}`}>
                                                    <span className={dragging ? "text-white dark:text-black" : "text-gray-400 dark:text-gray-500"}>{Icon.camera}</span>
                                                </div>
                                                <div className="text-center">
                                                    <p className={`text-sm font-semibold ${dragging ? "text-white dark:text-black" : "text-gray-700 dark:text-gray-300"}`}>Upload photo</p>
                                                    <p className={`text-xs mt-0.5 ${dragging ? "text-gray-300 dark:text-gray-600" : "text-gray-400 dark:text-gray-500"}`}>PNG, JPG — drag or click</p>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <Field label="Category" name="category_id" value={form.category_id} onChange={handleChange} as="select" icon={Icon.tag}>
                                        <option value="">Select category…</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </Field>

                                    <Field label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Jane Smith" icon={Icon.user} />
                                    <Field label="Role / Description" name="description" value={form.description} onChange={handleChange} placeholder="e.g. Lead Designer" icon={Icon.briefcase} />

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${editId
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100"
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                {editId ? "Updating…" : "Adding…"}
                                            </>
                                        ) : (
                                            <>
                                                {editId ? Icon.edit : Icon.plus}
                                                {editId ? "Update Member" : "Add Member"}
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* ── Right: Members List ── */}
                        <div className="lg:col-span-8 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                                    All Members
                                    {members.length > 0 && (
                                        <span className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] text-xs font-bold text-gray-600 dark:text-gray-400">
                                            {members.length}
                                        </span>
                                    )}
                                </h2>
                            </div>

                            {members.length === 0 && (
                                <div className="w-full rounded-2xl border-2 border-dashed border-gray-200 dark:border-[#2a2a2a] p-16 flex flex-col items-center justify-center gap-3 text-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-[#222] text-gray-400 dark:text-gray-500">
                                        {Icon.users}
                                    </div>
                                    <p className="text-base font-semibold text-gray-500 dark:text-gray-400">No team members yet</p>
                                    <p className="text-sm text-gray-400 dark:text-gray-600">Add your first member using the form on the left.</p>
                                </div>
                            )}

                            {[...members].reverse().map((member) => (
                                <MemberCard key={member.id} member={member} onDelete={confirmDelete} onEdit={handleEditClick} />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminTeam;