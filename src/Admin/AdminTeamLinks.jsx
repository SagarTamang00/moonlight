import { useState } from "react";
import useTeamMemberLinks from "../hooks/useTeamMemberLinks";
import { createMemberLink, deleteMemberLink } from "../api/teamLinks";
import PopupModal from "./PopupModal";
import {
    FaInstagram,
    FaTwitter,
    FaGithub,
    FaLinkedin,
    FaYoutube,
    FaTiktok,
    FaDiscord,
    FaDribbble,
    FaBehance,
    FaFacebook,
    FaVimeo,
    FaTwitch,
    FaPinterest,
    FaSnapchat,
    FaReddit,
    FaTelegram,
    FaWhatsapp,
    FaGlobe,
} from "react-icons/fa6";

const AdminTeamLinks = ({ memberId }) => {
    const { links, loading, refetch } = useTeamMemberLinks(memberId);

    const ICON_MAP = {
        instagram: FaInstagram,
        ig: FaInstagram,
        twitter: FaTwitter,
        x: FaTwitter,
        github: FaGithub,
        linkedin: FaLinkedin,
        youtube: FaYoutube,
        tiktok: FaTiktok,
        discord: FaDiscord,
        dribbble: FaDribbble,
        behance: FaBehance,
        facebook: FaFacebook,
        vimeo: FaVimeo,
        twitch: FaTwitch,
        pinterest: FaPinterest,
        snapchat: FaSnapchat,
        reddit: FaReddit,
        telegram: FaTelegram,
        whatsapp: FaWhatsapp,
    };

    function getPlatformIcon(platform) {
        return ICON_MAP[platform?.toLowerCase()] || FaGlobe;
    }

    const [form, setForm] = useState({
        platform: "",
        url: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const [modal, setModal] = useState({
        isOpen: false,
        type: "alert",
        title: "",
        message: "",
        onConfirm: null
    });

    const showModal = (type, title, message, onConfirm = null) => {
        setModal({ isOpen: true, type, title, message, onConfirm });
    };

    const closeModal = () =>
        setModal(prev => ({ ...prev, isOpen: false }));

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!form.platform || !form.url) return;

        try {
            await createMemberLink({
                member_id: memberId,
                ...form
            });
            setForm({ platform: "", url: "" });
            refetch();
        } catch (err) {
            console.log(err);
            showModal("alert", "Error", "Failed to add link");
        }
    };

    const confirmDelete = (id) => {
        showModal(
            "delete",
            "Delete Link",
            "Are you sure you want to delete this social link?",
            () => executeDelete(id)
        );
    };

    const executeDelete = async (id) => {
        closeModal();
        try {
            await deleteMemberLink(id);
            refetch();
        } catch (err) {
            console.log(err);
            showModal("alert", "Error", "Delete failed");
        }
    };

    if (loading)
        return (
            <div className="text-[10px] text-neutral-400 uppercase tracking-widest mt-2">
                Loading links...
            </div>
        );

    return (
        <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-[#222]">

            <PopupModal
                {...modal}
                onCancel={closeModal}
                onConfirm={() => {
                    if (modal.onConfirm) modal.onConfirm();
                    else closeModal();
                }}
            />

            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black dark:text-white mb-3">
                Social Links
            </h4>

            {/* List */}
            {links.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {links.map(link => {
                        const Icon = getPlatformIcon(link.platform);

                        return (
                            <div
                                key={link.id}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 dark:bg-[#222] rounded-full text-[11px] text-black dark:text-white"
                            >
                                {/* ICON ADDED HERE */}
                                <Icon className="text-sm" />

                                {/* Platform text (kept same) */}
                                <span className="font-bold capitalize">
                                    {link.platform}
                                </span>

                                <span className="text-neutral-400">|</span>

                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-neutral-500 hover:text-black dark:hover:text-white truncate max-w-[100px]"
                                >
                                    {link.url.replace(/^https?:\/\//, '')}
                                </a>

                                <button
                                    onClick={() => confirmDelete(link.id)}
                                    className="ml-1 text-neutral-400 hover:text-red-500 transition-colors"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2">
                <input
                    name="platform"
                    placeholder="Platform (e.g. instagram)"
                    value={form.platform}
                    onChange={handleChange}
                    className="flex-1 bg-transparent border border-neutral-200 dark:border-[#333] rounded-lg px-3 py-2 text-xs outline-none focus:border-black dark:focus:border-white text-black dark:text-white placeholder:text-neutral-400"
                />
                <input
                    name="url"
                    placeholder="URL"
                    value={form.url}
                    onChange={handleChange}
                    className="flex-[2] bg-transparent border border-neutral-200 dark:border-[#333] rounded-lg px-3 py-2 text-xs outline-none focus:border-black dark:focus:border-white text-black dark:text-white placeholder:text-neutral-400"
                />
                <button
                    type="submit"
                    disabled={!form.platform || !form.url}
                    className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add
                </button>
            </form>
        </div>
    );
};

export default AdminTeamLinks;