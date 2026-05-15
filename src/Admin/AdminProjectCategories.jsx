import { useState } from "react";

import useProjectCategories from "../hooks/useProjectCategories";

import {
    createProjectCategory,
    deleteProjectCategory
} from "../api/projectCategoryApi";


const AdminProjectCategories = () => {

    const { categories, loading } = useProjectCategories();

    const [name, setName] = useState("");


    // CREATE
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createProjectCategory({ name });

            alert("Category created successfully");

            window.location.reload();

        } catch (err) {

            console.log(err);

            alert("Failed to create category");
        }
    };


    // DELETE
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmDelete) return;

        try {

            await deleteProjectCategory(id);

            alert("Category deleted successfully");

            window.location.reload();

        } catch (err) {

            console.log(err);

            alert("Failed to delete category");
        }
    };


    if (loading) {
        return <p>Loading...</p>;
    }


    return (
        <div>

            <h2>Project Categories</h2>

            {/* CREATE FORM */}
            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <button type="submit">
                    Add Category
                </button>

            </form>


            {/* CATEGORY LIST */}
            <div>

                {categories.map((item) => (

                    <div key={item.id}>

                        <span>{item.name}</span>

                        <button
                            onClick={() => handleDelete(item.id)}
                        >
                            Delete
                        </button>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default AdminProjectCategories;