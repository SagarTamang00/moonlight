    import { useState } from "react";
    import usePartners from "../hooks/usePartners";
    import { createPartner, deletePartner } from "../api/partnerApi";

    const AdminPartners = () => {
        const { partners, loading } = usePartners();

        const [formData, setFormData] = useState({
            name: "",
            website: "",
            description: "",
            type: "",
        });

        const [logo, setLogo] = useState(null);

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                const data = new FormData();

                Object.keys(formData).forEach((key) => {
                    data.append(key, formData[key]);
                });

                if (logo) data.append("logo", logo);

                await createPartner(data);

                alert("Partner created successfully");
                window.location.reload();
            } catch (err) {
                console.log(err);
                alert("Failed to create partner");
            }
        };

        const handleDelete = async (id) => {
            if (!window.confirm("Delete this partner?")) return;

            try {
                await deletePartner(id);
                alert("Partner deleted successfully");
                window.location.reload();
            } catch (err) {
                console.log(err);
                alert("Failed to delete partner");
            }
        };

        if (loading) {
            return (
                <div className="min-h-screen flex items-center justify-center text-[var(--color-text)]">
                    Loading...
                </div>
            );
        }

        return (
            <div className="min-h-screen px-6 py-12 bg-[var(--color-bg)] text-[var(--color-text)]">
                <div className="max-w-7xl mx-auto">

                    {/* HEADER */}
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold tracking-tight">
                            Partners Admin
                        </h1>
                        <p className="text-sm opacity-70 mt-2">
                            Manage partners, sponsors & platforms
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-14">

                        {/* CREATE FORM */}
                        <div className="w-full max-w-2xl bg-[var(--color-bg-section)] border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-xl">

                            <h2 className="text-xl font-semibold mb-6 text-cente">
                                Add Partner
                            </h2>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Partner Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 outline-none focus:border-[var(--color-text)]"
                                />

                                <input
                                    type="url"
                                    name="website"
                                    placeholder="Website URL"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 outline-none focus:border-[var(--color-text)]"
                                />

                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full p-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 outline-none focus:border-[var(--color-text)]"
                                />

                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
    className="
        w-full p-3 rounded-xl
        bg-[var(--color-bg)]
        text-[var(--color-text)]
        border border-[var(--color-text)]/20
    "                            >
                                    <option value="">Select Type</option>
                                    <option value="studio">Studio</option>
                                    <option value="sponsor">Sponsor</option>
                                    <option value="platform">Platform</option>
                                </select>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setLogo(e.target.files[0])
                                    }
                                    className="w-full text-sm"
                                />

                                <button
                                    type="submit"
                                    className="w-full py-3 rounded-xl bg-[var(--color-text)] text-[var(--color-bg)] font-semibold hover:scale-[1.02] transition"
                                >
                                    Create Partner
                                </button>
                            </form>
                        </div>

                        {/* PARTNER LIST */}
                        <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {partners.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-[var(--color-bg-section)] border border-[var(--color-text)]/10 rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition"
                                >
                                    {item.logo && (
                                        <img
                                            src={`http://localhost:5000${item.logo}`}
                                            alt={item.name}
                                            className="w-28 h-28 object-contain mb-5 mx-auto"
                                        />
                                    )}

                                    <h3 className="text-xl font-semibold text-center">
                                        {item.name}
                                    </h3>

                                    <p className="text-center opacity-60 text-sm mt-2 uppercase tracking-wide">
                                        {item.type}
                                    </p>

                                    {item.website && (
                                        <a
                                            href={item.website}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="block text-center mt-4 underline opacity-80 hover:opacity-100"
                                        >
                                            Visit Website
                                        </a>
                                    )}

                                    <button
                                        onClick={() =>
                                            handleDelete(item.id)
                                        }
                                        className="w-full mt-6 py-3 rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default AdminPartners;