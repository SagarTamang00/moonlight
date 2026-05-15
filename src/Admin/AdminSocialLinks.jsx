import { useState } from "react";
import useSocialLinks from "../hooks/useSocialLinks";
import { createSocialLink, deleteSocialLink } from "../api/socialLinks";
import PopupModal from "./PopupModal";

const ICON_MAP = {
    instagram: 'ti-brand-instagram',
    ig: 'ti-brand-instagram',
    x: 'ti-brand-twitter',
    twitter: 'ti-brand-twitter',
    github: 'ti-brand-github',
    git: 'ti-brand-github',
    linkedin: 'ti-brand-linkedin',
    youtube: 'ti-brand-youtube',
    yt: 'ti-brand-youtube',
    tiktok: 'ti-brand-tiktok',
    discord: 'ti-brand-discord',
    dribbble: 'ti-brand-dribbble',
    behance: 'ti-brand-behance',
    facebook: 'ti-brand-facebook',
    vimeo: 'ti-brand-vimeo',
    twitch: 'ti-brand-twitch',
    pinterest: 'ti-brand-pinterest',
    snapchat: 'ti-brand-snapchat',
    reddit: 'ti-brand-reddit',
    telegram: 'ti-brand-telegram',
    whatsapp: 'ti-brand-whatsapp',
}

function getPlatformIcon(platform) {
    return ICON_MAP[platform?.toLowerCase()] || 'ti-world'
}

const AdminSocialLinks = () => {
    const { links, loading, refetch } = useSocialLinks();

    const [platform, setPlatform] = useState("");
    const [url, setUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [modal, setModal] = useState({ isOpen: false, type: "alert", title: "", message: "", onConfirm: null });

    const showModal = (type, title, message, onConfirm = null) => {
        setModal({ isOpen: true, type, title, message, onConfirm });
    };

    const closeModal = () => setModal(prev => ({ ...prev, isOpen: false }));

    const canSubmit = !!platform.trim() && !!url.trim();

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;
        setIsSubmitting(true);
        try {
            await createSocialLink({ platform: platform.trim(), url: url.trim() });
            setPlatform("");
            setUrl("");
            refetch();
        } catch (err) {
            console.error(err);
            showModal("alert", "Error", "Failed to add link");
        } finally {
            setIsSubmitting(false);
        }
    };

    const confirmDelete = (id) => {
        showModal("delete", "Delete Social Link", "Are you sure you want to delete this social link?", () => executeDelete(id));
    };

    const executeDelete = async (id) => {
        closeModal();
        try {
            await deleteSocialLink(id);
            refetch();
        } catch (err) {
            console.error(err);
            showModal("alert", "Error", "Delete failed");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-2 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-black relative">
            <PopupModal
                {...modal}
                onCancel={closeModal}
                onConfirm={() => {
                    if (modal.onConfirm) modal.onConfirm();
                    else closeModal();
                }}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">
                            Settings
                        </p>
                        <h1 className="text-3xl font-bold text-black dark:text-white">
                            Social Links
                        </h1>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-500 dark:text-neutral-400 w-fit">
                        {links.length} {links.length === 1 ? "link" : "links"}
                    </div>
                </div>

                {/* Add Card */}
                <div className="bg-white dark:bg-[#0b0b0b] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 sm:p-6 mb-6">
                    <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* Platform */}
                        <div>
                            <label className="block text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                                Platform
                            </label>
                            <input
                                type="text"
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                                placeholder="e.g. Instagram, Vimeo..."
                                className="w-full h-11 rounded-xl bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-700 px-4 text-sm text-black dark:text-white placeholder:text-neutral-400 outline-none focus:border-black dark:focus:border-white transition-all"
                            />
                        </div>

                        {/* URL */}
                        <div>
                            <label className="block text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                                URL
                            </label>
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://..."
                                className="w-full h-11 rounded-xl bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-700 px-4 text-sm text-black dark:text-white placeholder:text-neutral-400 outline-none focus:border-black dark:focus:border-white transition-all"
                            />
                        </div>

                        {/* Button */}
                        <div className="flex items-end">
                            <button
                                type="submit"
                                disabled={!canSubmit || isSubmitting}
                                className="w-full h-11 rounded-xl bg-black dark:bg-white text-white dark:text-black text-sm font-medium transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Adding..." : "Add Link"}
                            </button>
                        </div>

                        {/* Live icon preview */}
                        {platform.trim() && (
                            <div className="md:col-span-3 flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                                <div className="w-10 h-10 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-black dark:text-white flex-shrink-0">
                                    <i className={`ti ${getPlatformIcon(platform)} text-xl`} />
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Icon preview</p>
                                    <p className="text-sm font-medium text-black dark:text-white capitalize">{platform}</p>
                                </div>
                                {!ICON_MAP[platform.toLowerCase()] && (
                                    <p className="ml-auto text-[10px] text-amber-500 tracking-wide">
                                        No icon found — globe will be used
                                    </p>
                                )}
                            </div>
                        )}
                    </form>
                </div>

                {/* Social Links List */}
                <div className="space-y-3">

                    {links.length === 0 && (
                        <div className="bg-white dark:bg-[#0b0b0b] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-10 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mx-auto mb-4">
                                <i className="ti ti-link-off text-2xl text-neutral-400" />
                            </div>
                            <h3 className="text-lg font-medium text-black dark:text-white mb-1">No links added</h3>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">Add your social platforms above</p>
                        </div>
                    )}

                    {links.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white dark:bg-[#0b0b0b] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 flex items-center justify-between gap-4 transition-all hover:border-black dark:hover:border-white"
                        >
                            {/* Left */}
                            <div className="flex items-center gap-4 min-w-0">

                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-black dark:text-white flex-shrink-0">
                                    <i className={`ti ${getPlatformIcon(item.platform)} text-xl`} />
                                </div>

                                {/* Content */}
                                <div className="min-w-0">
                                    <h3 className="text-sm font-semibold text-black dark:text-white capitalize">
                                        {item.platform}
                                    </h3>

                                    <a href={item.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white truncate block transition-colors"
                                    >
                                        {item.url}
                                    </a>
                                </div>
                            </div>

                            {/* Delete */}
                            < button
                                onClick={() => confirmDelete(item.id)}
                                className="w-10 h-10 rounded-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-red-500 hover:border-red-200 dark:hover:border-red-900 hover:bg-red-50 dark:hover:bg-red-950 transition-all flex-shrink-0"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div >
        </div >
    );
};

export default AdminSocialLinks;