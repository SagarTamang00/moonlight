import { useState } from "react";
import API from "../utils/api";
import useSocialLinks from "../hooks/useSocialLinks";

const AdminSocialLinks = () => {
    const { links, loading } = useSocialLinks();

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

    // CREATE (POST)
    const handleAdd = async (e) => {
        e.preventDefault();

        try {
            await API.post("/social-links", form);

            alert("Added successfully");

            window.location.reload(); // simple refresh for now
        } catch (err) {
            console.log(err);
            alert("Failed to add");
        }
    };

    // DELETE
    const handleDelete = async (id) => {
        try {
            await API.delete(`/social-links/${id}`);

            alert("Deleted successfully");

            window.location.reload(); // simple refresh for now
        } catch (err) {
            console.log(err);
            alert("Delete failed");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Social Links Admin</h2>

            {/* CREATE FORM */}
            <form onSubmit={handleAdd}>
                <input
                    name="platform"
                    placeholder="Platform (facebook, insta...)"
                    onChange={handleChange}
                />

                <input
                    name="url"
                    placeholder="URL"
                    onChange={handleChange}
                />

                <button type="submit">
                    Add
                </button>
            </form>

            {/* LIST */}
            <div>
                {links.map((item) => (
                    <div key={item.id}>
                        <span>{item.platform}</span>
                        <span>{item.url}</span>

                        <button onClick={() => handleDelete(item.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminSocialLinks;