import { useState } from "react";
import useTeamMemberLinks from "../hooks/useTeamMemberLinks";
import { createMemberLink, deleteMemberLink } from "../api/teamLinks";

const AdminTeamLinks = ({ memberId }) => {
    const { links, loading, refetch } = useTeamMemberLinks(memberId);

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

    const handleAdd = async (e) => {
        e.preventDefault();

        try {
            await createMemberLink({
                member_id: memberId,
                ...form
            });

            alert("Link added");

            setForm({ platform: "", url: "" });
            refetch();
        } catch (err) {
            console.log(err);
            alert("Failed");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteMemberLink(id);

            alert("Deleted");
            refetch();
        } catch (err) {
            console.log(err);
            alert("Delete failed");
        }
    };

    if (loading) return <p>Loading links...</p>;

    return (
        <div style={{ marginTop: "10px" }}>
            <h4>Links</h4>

            <form onSubmit={handleAdd}>
                <input
                    name="platform"
                    placeholder="Platform"
                    value={form.platform}
                    onChange={handleChange}
                />

                <input
                    name="url"
                    placeholder="URL"
                    value={form.url}
                    onChange={handleChange}
                />

                <button type="submit">Add Link</button>
            </form>

            <div>
                {links.map(link => (
                    <div key={link.id}>
                        {link.platform} - {link.url}
                        <button onClick={() => handleDelete(link.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminTeamLinks;