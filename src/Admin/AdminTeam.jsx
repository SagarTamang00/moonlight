import { useState } from "react";
import useTeamMembers from "../hooks/useTeamMembers";
import useTeamCategories from "../hooks/useTeamCategories";
import { createTeamMember, deleteTeamMember } from "../api/teamMembers";
import AdminTeamCategories from "./AdminTeamCategories";
import AdminTeamLinks from "./AdminTeamLinks";

const AdminTeam = () => {
    const { members, loading, refetch } = useTeamMembers();
    const { categories } = useTeamCategories();

    const [form, setForm] = useState({
        category_id: "",
        name: "",
        description: "",
        image: null
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleFile = (e) => {
        setForm({
            ...form,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("category_id", form.category_id);
        formData.append("name", form.name);
        formData.append("description", form.description);

        if (form.image) {
            formData.append("image", form.image);
        }

        try {
            await createTeamMember(formData);

            alert("Member added");

            setForm({
                category_id: "",
                name: "",
                description: "",
                image: null
            });

            refetch();
        } catch (err) {
            console.log(err);
            alert("Failed to add member");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTeamMember(id);
            alert("Deleted");
            refetch();
        } catch (err) {
            console.log(err);
            alert("Delete failed");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Team Admin</h2>

            {/* CREATE FORM */}
            <form onSubmit={handleSubmit}>

                {/* CATEGORY */}
                <select
                    name="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />

                <input type="file" onChange={handleFile} />

                <button type="submit">Add Member</button>
            </form>

            {/* LIST */}
            <div>
                {members.map(member => (
                    <div key={member.id} style={{ marginTop: "20px" }}>
                        <h3>{member.name}</h3>
                        <p>{member.description}</p>

                        {member.image && (
                            <img
                                src={`http://localhost:5000${member.image}`}
                                width="80"
                            />
                        )}

                        {/* LINKS */}
                        <AdminTeamLinks memberId={member.id} />

                        <button onClick={() => handleDelete(member.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminTeam;