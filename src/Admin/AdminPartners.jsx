import { useState } from "react";

import usePartners from "../hooks/usePartners";

import {
    createPartner,
    deletePartner,
    updatePartner
} from "../api/partnerApi";
import { BASE_URL } from "../utils/api";
import { useRef } from "react";


const AdminPartners = () => {

    const {
        partners,
        loading,
        refetchPartners
    } = usePartners();

    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        website: "",
        description: "",
        type: "",
    });
    const formRef = useRef(null);
    

    const [logo, setLogo] = useState(null);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {

        setFormData({
            name: "",
            website: "",
            description: "",
            type: "",
        });

        setLogo(null);
        setEditingId(null);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            if (logo) {
                data.append("logo", logo);
            }

            // UPDATE
            if (editingId) {

                await updatePartner(editingId, data);

                alert("Partner updated successfully");

            } else {

                // CREATE
                await createPartner(data);

                alert("Partner created successfully");
            }

            // REFETCH DATA
            await refetchPartners();

            // RESET FORM
            resetForm();

        } catch (err) {

            console.log(err);

            alert(
                editingId
                    ? "Failed to update partner"
                    : "Failed to create partner"
            );
        }
    };

const handleEdit = (item) => {

    setEditingId(item.id);

    setFormData({
        name: item.name || "",
        website: item.website || "",
        description: item.description || "",
        type: item.type || "",
    });
              formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
};

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this partner?")) return;

        try {

            await deletePartner(id);

            alert("Partner deleted successfully");

            await refetchPartners();

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

                    {/* FORM */}
                    <div 
                        ref={formRef}
                        className="w-full max-w-2xl bg-[var(--color-bg-section)] border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-xl">

                        <h2 className="text-xl font-semibold mb-6">

                            {editingId
                                ? "Edit Partner"
                                : "Add Partner"}

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
                                "
                            >

                                <option value="">
                                    Select Type
                                </option>

                                <option value="studio">
                                    Studio
                                </option>

                                <option value="sponsor">
                                    Sponsor
                                </option>

                                <option value="platform">
                                    Platform
                                </option>

                            </select>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setLogo(e.target.files[0])
                                }
                                className="w-full text-sm"
                            />

                            <div className="flex gap-4">

                                <button
                                    type="submit"
                                    className="flex-1 py-3 rounded-xl bg-[var(--color-text)] text-[var(--color-bg)] font-semibold hover:scale-[1.02] transition"
                                >

                                    {editingId
                                        ? "Update Partner"
                                        : "Create Partner"}

                                </button>

                                {editingId && (

                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-6 py-3 rounded-xl border border-[var(--color-text)]/20"
                                    >
                                        Cancel
                                    </button>

                                )}

                            </div>

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
                                    
                                         src={`${BASE_URL}${item.logo}`}
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

                                <div className="flex gap-3 mt-6">

                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="flex-1 py-3 rounded-xl border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(item.id)
                                        }
                                        className="flex-1 py-3 rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AdminPartners;