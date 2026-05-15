import { useState, useEffect } from "react";
import useSettings from "../hooks/useSettings";
import { updateSettings } from "../api/settings";
import { BASE_URL } from "../utils/api";
import PopupModal from "./PopupModal";

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
        <div className="max-w-2xl mx-auto px-4 py-10 relative">
            <PopupModal
                {...modal}
                onCancel={closeModal}
                onConfirm={() => {
                    if (modal.onConfirm) modal.onConfirm();
                    else closeModal();
                }}
            />

            {/* Page title */}
            <h1 className="text-xl font-medium text-black dark:text-white mb-8">
                Settings
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Logo upload */}
                <input
                    id="logo-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files[0])}
                />
                <div
                    onClick={() => document.getElementById("logo-input").click()}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
                    className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors
                        ${dragging
                            ? "border-black dark:border-white bg-neutral-50 dark:bg-neutral-900"
                            : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                        }`}
                >
                    <div className="w-14 h-14 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {logoPreview || settings?.logo ? (
                            <img
                                src={logoPreview || `${BASE_URL}${settings.logo}`}
                                alt="logo"
                                className="w-full h-full object-contain p-1.5"
                            />
                        ) : (
                            <i className="ti ti-photo text-neutral-400 dark:text-neutral-600 text-xl" />
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-black dark:text-white">Site logo</p>
                        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
                            Click to upload — PNG, JPG or SVG
                        </p>
                    </div>
                </div>

                {/* About */}
                <div>
                    <label className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1.5">
                        About description
                    </label>
                    <textarea
                        name="about_description"
                        value={form.about_description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Write a short description…"
                        className="w-full px-3 py-2.5 text-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none focus:border-neutral-400 dark:focus:border-neutral-600 resize-none transition-colors"
                    />
                </div>

                {/* Google Maps */}
                <div>
                    <label className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1.5">
                        Location (Address or Google Maps Embed link)
                    </label>
                    <input
                        name="google_maps_link"
                        value={form.google_maps_link}
                        onChange={handleChange}
                        placeholder="e.g. Kathmandu, Nepal OR <iframe src='...' />"
                        className="w-full h-10 px-3 text-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
                    />
                    {form.google_maps_link && (
                        <div className="mt-3 relative w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800" style={{ height: '180px' }}>
                            <iframe
                                src={getEmbedUrl(form.google_maps_link)}
                                width="100%"
                                height="100%"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(8,8,8,0.1)' }} />
                            <p className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[9px] font-bold tracking-widest uppercase text-white/80">
                                Live Preview
                            </p>
                        </div>
                    )}
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1.5">
                            Email
                        </label>
                        <input
                            name="contact_email"
                            type="email"
                            value={form.contact_email}
                            onChange={handleChange}
                            placeholder="studio@example.com"
                            className="w-full h-10 px-3 text-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1.5">
                            Phone
                        </label>
                        <input
                            name="contact_phone"
                            type="tel"
                            value={form.contact_phone}
                            onChange={handleChange}
                            placeholder="+1 234 567 890"
                            className="w-full h-10 px-3 text-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <span className={`text-sm text-green-600 dark:text-green-400 transition-opacity duration-300 ${saved ? "opacity-100" : "opacity-0"}`}>
                        Saved successfully
                    </span>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="h-9 px-5 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-lg transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {submitting ? "Saving…" : "Save settings"}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AdminSettings;