import { useState } from "react";
import useTeamCategories from "../hooks/useTeamCategories";
import { createTeamCategory, deleteTeamCategory } from "../api/teamCategories";

const AdminTeamCategories = () => {
    const { categories, loading, refetch } = useTeamCategories();

    const [name, setName] = useState("");

    const handleAdd = async (e) => {
        e.preventDefault();

        try {
            await createTeamCategory({ name });

            alert("Category added");
            setName("");
            refetch();
        } catch (err) {
            console.log(err);
            alert("Failed");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTeamCategory(id);

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
            <h2>Team Categories</h2>

            <form onSubmit={handleAdd}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Category name"
                />
                <button type="submit">Add</button>
            </form>

            <div>
                {categories.map(cat => (
                    <div key={cat.id}>
                        {cat.name}
                        <button onClick={() => handleDelete(cat.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminTeamCategories;