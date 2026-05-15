import { useState } from "react";

import useProjects from "../hooks/useProjects";
import useProjectCategories from "../hooks/useProjectCategories";

import {
    createProject,
    deleteProject
} from "../api/projectApi";


const AdminProjects = () => {

    const { projects, loading } = useProjects();

    const { categories } = useProjectCategories();


    const [formData, setFormData] = useState({
        category_id: "",
        title: "",
        description: "",
        duration: "",
        seasons: "",
        episodes: "",
        release_year: "",
        status: "upcoming",
        featured: false
    });

    const [poster, setPoster] = useState(null);


    // HANDLE INPUT CHANGE
    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox"
                ? checked
                : value
        });
    };


    // HANDLE FILE CHANGE
    const handlePosterChange = (e) => {

        setPoster(e.target.files[0]);
    };


    // CREATE PROJECT
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            if (poster) {
                data.append("poster", poster);
            }

            await createProject(data);

            alert("Project created successfully");

            window.location.reload();

        } catch (err) {

            console.log(err);

            alert("Failed to create project");
        }
    };


    // DELETE PROJECT
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmDelete) return;

        try {

            await deleteProject(id);

            alert("Project deleted successfully");

            window.location.reload();

        } catch (err) {

            console.log(err);

            alert("Failed to delete project");
        }
    };


    if (loading) {
        return <p>Loading...</p>;
    }


    return (
        <div>

            <h2>Projects Admin</h2>

            {/* CREATE FORM */}
            <form onSubmit={handleSubmit}>

                {/* CATEGORY */}
                <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Category
                    </option>

                    {categories.map((category) => (

                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}

                </select>


                {/* TITLE */}
                <input
                    type="text"
                    name="title"
                    placeholder="Project Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />


                {/* DESCRIPTION */}
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />


                {/* POSTER */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePosterChange}
                />


                {/* DURATION */}
                <input
                    type="text"
                    name="duration"
                    placeholder="Duration"
                    value={formData.duration}
                    onChange={handleChange}
                />


                {/* SEASONS */}
                <input
                    type="number"
                    name="seasons"
                    placeholder="Seasons"
                    value={formData.seasons}
                    onChange={handleChange}
                />


                {/* EPISODES */}
                <input
                    type="number"
                    name="episodes"
                    placeholder="Episodes"
                    value={formData.episodes}
                    onChange={handleChange}
                />


                {/* RELEASE YEAR */}
                <input
                    type="number"
                    name="release_year"
                    placeholder="Release Year"
                    value={formData.release_year}
                    onChange={handleChange}
                />


                {/* STATUS */}
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="upcoming">
                        Upcoming
                    </option>

                    <option value="ongoing">
                        Ongoing
                    </option>

                    <option value="completed">
                        Completed
                    </option>
                </select>


                {/* FEATURED */}
                <label>

                    Featured

                    <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                    />

                </label>


                <button type="submit">
                    Create Project
                </button>

            </form>


            {/* PROJECT LIST */}
            <div>

                {projects.map((project) => (

                    <div key={project.id}>

                        <img
                            src={`http://localhost:5000${project.poster}`}
                            alt={project.title}
                            width="120"
                        />

                        <h3>{project.title}</h3>

                        <p>{project.category_name}</p>

                        <p>{project.status}</p>

                        <button
                            onClick={() => handleDelete(project.id)}
                        >
                            Delete
                        </button>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default AdminProjects;