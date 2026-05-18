import { useState, useEffect } from "react";
import useSettings from "../hooks/useSettings";
import { updateSettings } from "../api/settings";
import { BASE_URL } from "../utils/api";
import PopupModal from "./PopupModal";
import { Image as ImageIcon } from "lucide-react";

const getEmbedUrl = (url) => {
    if (!url) return null;
    // If user pasted an iframe, extract the src
    if (url.includes('<iframe')) {
        const match = url.match(/src="([^"]+)"/);
        if (match) return match[1];
    }
    // If it's already an embed link
    if (url.includes('/maps/embed')) return url;
    // If it's a direct place link
    if (url.includes('google.com/maps/place/')) {
        const placeName = url.split('/place/')[1].split('/')[0];
        return `https://maps.google.com/maps?q=${placeName}&output=embed`;
    }
    // Otherwise, treat as an address or generic query
    return `https://maps.google.com/maps?q=${encodeURIComponent(url)}&output=embed`;
};

const AdminSettings = () => {
    const { settings, loading } = useSettings();

    const [saved, setSaved] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [logoPreview, setLogoPreview] = useState(null);
    const [dragging, setDragging] = useState(false);

    const [modal, setModal] = useState({ isOpen: false, type: "alert", title: "", message: "", onConfirm: null });

    const showModal = (type, title, message, onConfirm = null) => {
        setModal({ isOpen: true, type, title, message, onConfirm });
    };

    const closeModal = () => setModal(prev => ({ ...prev, isOpen: false }));

    const [form, setForm] = useState({
        logo: null,
        about_description: "",
        google_maps_link: "",
        contact_email: "",
        contact_phone: "",
    });

    useEffect(() => {
        if (settings) {
            setForm((prev) => ({
                ...prev,
                about_description: settings.about_description || "",
                google_maps_link: settings.google_maps_link || "",
                contact_email: settings.contact_email || "",
                contact_phone: settings.contact_phone || "",
            }));
        }
    }, [settings]);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleFile = (file) => {
        if (!file) return;
        setForm({ ...form, logo: file });
        setLogoPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData();
        formData.append("about_description", form.about_description);
        formData.append("google_maps_link", form.google_maps_link);
        formData.append("contact_email", form.contact_email);
        formData.append("contact_phone", form.contact_phone);
        if (form.logo) formData.append("logo", form.logo);
        try {
            await updateSettings(formData);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch {
            showModal("alert", "Error", "Update failed");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center p-20">
            <div className="w-5 h-5 border-2 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
<div className="h-screen overflow-hidden bg-neutral-50 dark:bg-black">

    {/* SCROLLABLE AREA ONLY */}
    <div className="h-full overflow-y-auto">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

            {/* Modal */}
            <PopupModal
                {...modal}
                onCancel={closeModal}
                onConfirm={() => {
                    if (modal.onConfirm) modal.onConfirm();
                    else closeModal();
                }}
            />

            {/* Header */}
            <div className="mb-10">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-black dark:text-white">
                    Settings
                </h1>
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                    Manage your website information and contact details.
                </p>
            </div>

            {/* Card */}
            <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm overflow-hidden">

                <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-8">

                    {/* Logo Upload */}
                    <div>
                        <label className="block text-sm font-medium text-black dark:text-white mb-3">
                            Site Logo
                        </label>

                        <input
                            id="logo-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFile(e.target.files[0])}
                        />

                        <div
                            onClick={() => document.getElementById("logo-input").click()}
                            onDragOver={(e) => {
                                e.preventDefault();
                                setDragging(true);
                            }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setDragging(false);
                                handleFile(e.dataTransfer.files[0]);
                            }}
                            className={`
                                group relative flex flex-col sm:flex-row items-center gap-5
                                p-5 rounded-2xl border-2 border-dashed transition-all cursor-pointer
                                ${dragging
                                    ? "border-black dark:border-white bg-neutral-100 dark:bg-neutral-900"
                                    : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500"
                                }
                            `}
                        >
                            <div className="w-24 h-24 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center overflow-hidden shrink-0">
                                {logoPreview || settings?.logo ? (
                                    <img
                                        src={logoPreview || `${BASE_URL}${settings.logo}`}
                                        alt="logo"
                                        className="w-full h-full object-contain p-3"
                                    />
                                ) : (
                                    <ImageIcon className="w-8 h-8 text-neutral-400 dark:text-neutral-600" />
                                )}
                            </div>

                            <div className="text-center sm:text-left">
                                <p className="text-sm font-medium text-black dark:text-white">
                                    Upload your logo
                                </p>
                                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                    Drag & drop or click to browse
                                </p>
                                <p className="mt-2 text-[11px] text-neutral-400 dark:text-neutral-500">
                                    Supports PNG, JPG, SVG
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* About */}
                    <div>
                        <label className="block text-sm font-medium text-black dark:text-white mb-3">
                            About Description
                        </label>

                        <textarea
                            name="about_description"
                            value={form.about_description}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Write a short description about your business..."
                            className="
                                w-full rounded-xl border border-neutral-200 dark:border-neutral-800
                                bg-white dark:bg-neutral-900
                                px-4 py-3 text-sm
                                text-black dark:text-white
                                placeholder:text-neutral-400 dark:placeholder:text-neutral-500
                                outline-none resize-none transition-all
                                focus:ring-2 focus:ring-black/5 dark:focus:ring-white/10
                                focus:border-neutral-400 dark:focus:border-neutral-600
                            "
                        />
                    </div>

                    {/* Google Maps */}
                    <div>
                        <label className="block text-sm font-medium text-black dark:text-white mb-3">
                            Location
                        </label>

                        <input
                            name="google_maps_link"
                            value={form.google_maps_link}
                            onChange={handleChange}
                            placeholder="Address or Google Maps embed link"
                            className="
                                w-full h-11 rounded-xl border border-neutral-200 dark:border-neutral-800
                                bg-white dark:bg-neutral-900
                                px-4 text-sm
                                text-black dark:text-white
                                placeholder:text-neutral-400 dark:placeholder:text-neutral-500
                                outline-none transition-all
                                focus:ring-2 focus:ring-black/5 dark:focus:ring-white/10
                                focus:border-neutral-400 dark:focus:border-neutral-600
                            "
                        />

                        {form.google_maps_link && (
                            <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
                                <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                                    <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                                        Live Preview
                                    </p>
                                </div>

                                <div className="relative h-[220px] sm:h-[300px]">
                                    <iframe
                                        src={getEmbedUrl(form.google_maps_link)}
                                        width="100%"
                                        height="100%"
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Contact Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-black dark:text-white mb-3">
                                Contact Email
                            </label>

                            <input
                                name="contact_email"
                                type="email"
                                value={form.contact_email}
                                onChange={handleChange}
                                placeholder="studio@example.com"
                                className="
                                    w-full h-11 rounded-xl border border-neutral-200 dark:border-neutral-800
                                    bg-white dark:bg-neutral-900
                                    px-4 text-sm
                                    text-black dark:text-white
                                    placeholder:text-neutral-400 dark:placeholder:text-neutral-500
                                    outline-none transition-all
                                    focus:ring-2 focus:ring-black/5 dark:focus:ring-white/10
                                    focus:border-neutral-400 dark:focus:border-neutral-600
                                "
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-black dark:text-white mb-3">
                                Contact Phone
                            </label>

                            <input
                                name="contact_phone"
                                type="tel"
                                value={form.contact_phone}
                                onChange={handleChange}
                                placeholder="+1 234 567 890"
                                className="
                                    w-full h-11 rounded-xl border border-neutral-200 dark:border-neutral-800
                                    bg-white dark:bg-neutral-900
                                    px-4 text-sm
                                    text-black dark:text-white
                                    placeholder:text-neutral-400 dark:placeholder:text-neutral-500
                                    outline-none transition-all
                                    focus:ring-2 focus:ring-black/5 dark:focus:ring-white/10
                                    focus:border-neutral-400 dark:focus:border-neutral-600
                                "
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">

                        <span
                            className={`
                                text-sm font-medium text-green-600 dark:text-green-400
                                transition-all duration-300
                                ${saved ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
                            `}
                        >
                            Settings saved successfully
                        </span>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="
                                w-full sm:w-auto
                                h-11 px-6 rounded-xl
                                bg-black dark:bg-white
                                text-white dark:text-black
                                text-sm font-medium
                                transition-all
                                hover:opacity-90
                                active:scale-[0.98]
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >
                            {submitting ? "Saving..." : "Save Settings"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>
    );
};

export default AdminSettings;