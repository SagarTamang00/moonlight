import { useState, useEffect } from "react";
import API from "../utils/api";
import useSettings from "../hooks/useSettings";

const AdminSettings = () => {
    const { settings, loading } = useSettings();

    const [form, setForm] = useState({
        logo: null,
        about_description: "",
        google_maps_link: "",
        contact_email: "",
        contact_phone: ""
    });

    // Fill form when data loads
    useEffect(() => {
        if (settings) {
            setForm((prev) => ({
                ...prev,
                about_description: settings.about_description || "",
                google_maps_link: settings.google_maps_link || "",
                contact_email: settings.contact_email || "",
                contact_phone: settings.contact_phone || ""
            }));
        }
    }, [settings]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleFile = (e) => {
        setForm({
            ...form,
            logo: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("about_description", form.about_description);
        formData.append("google_maps_link", form.google_maps_link);
        formData.append("contact_email", form.contact_email);
        formData.append("contact_phone", form.contact_phone);

        if (form.logo) {
            formData.append("logo", form.logo);
        }

        try {
            const res = await API.put("/settings", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            alert(res.data.message);
        } catch (err) {
            console.log(err);
            alert("Update failed");
        }
    };

    if (loading) return <p>Loading settings...</p>;

    return (
        <div>
            <h2>Admin Settings</h2>

            <form onSubmit={handleSubmit}>
                {/* Logo upload */}
                <input type="file" onChange={handleFile} />

                {/* About */}
                <input
                    name="about_description"
                    placeholder="About Description"
                    value={form.about_description}
                    onChange={handleChange}
                />

                {/* Google Maps */}
                <input
                    name="google_maps_link"
                    placeholder="Google Maps Link"
                    value={form.google_maps_link}
                    onChange={handleChange}
                />

                {/* Email */}
                <input
                    name="contact_email"
                    placeholder="Contact Email"
                    value={form.contact_email}
                    onChange={handleChange}
                />

                {/* Phone */}
                <input
                    name="contact_phone"
                    placeholder="Contact Phone"
                    value={form.contact_phone}
                    onChange={handleChange}
                />

                <button type="submit">
                    Save Settings
                </button>
            </form>

            {/* Optional preview */}
            {settings?.logo && (
                <img
                    src={`http://localhost:5000${settings.logo}`}
                    alt="logo"
                    width="100"
                />
            )}
        </div>
    );
};

export default AdminSettings;