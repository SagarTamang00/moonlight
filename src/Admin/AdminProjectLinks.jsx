import { useState } from "react";

import useProjects from "../hooks/useProjects";
import useProjectLinks from "../hooks/useProjectLinks";

import {
    createProjectLink,
    deleteProjectLink
} from "../api/projectLinkApi";


const AdminProjectLinks = () => {

    const { projects } = useProjects();

    const [selectedProject, setSelectedProject] = useState("");

    const { links, loading } = useProjectLinks(selectedProject);


    const [formData, setFormData] = useState({
        project_id: "",
        type: "",
        url: ""
    });


    // HANDLE INPUT
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // HANDLE PROJECT SELECT
    const handleProjectSelect = (e) => {

        const projectId = e.target.value;

        setSelectedProject(projectId);

        setFormData({
            ...formData,
            project_id: projectId
        });
    };


    // CREATE LINK
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createProjectLink(formData);

            alert("Project link added successfully");

            window.location.reload();

        } catch (err) {

            console.log(err);

            alert("Failed to add project link");
        }
    };


    // DELETE LINK
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this link?"
        );

        if (!confirmDelete) return;

        try {

            await deleteProjectLink(id);

            alert("Link deleted successfully");

            window.location.reload();

        } catch (err) {

            console.log(err);

            alert("Failed to delete link");
        }
    };


    return (
        <div>

            <h2>Project Links Admin</h2>


            {/* SELECT PROJECT */}
            <select
                value={selectedProject}
                onChange={handleProjectSelect}
            >

                <option value="">
                    Select Project
                </option>

                {projects.map((project) => (

                    <option
                        key={project.id}
                        value={project.id}
                    >
                        {project.title}
                    </option>
                ))}

            </select>


            {/* CREATE LINK FORM */}
            <form onSubmit={handleSubmit}>

                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Link Type
                    </option>

                    <option value="trailer">
                        Trailer
                    </option>

                    <option value="teaser">
                        Teaser
                    </option>

                    <option value="promo">
                        Promo
                    </option>

                    <option value="playlist">
                        Playlist
                    </option>

                    <option value="watch">
                        Watch
                    </option>

                </select>


                <input
                    type="url"
                    name="url"
                    placeholder="Enter URL"
                    value={formData.url}
                    onChange={handleChange}
                    required
                />


                <button type="submit">
                    Add Link
                </button>

            </form>


            {/* LINKS LIST */}
            <div>

                {loading ? (

                    <p>Loading...</p>

                ) : (

                    links.map((link) => (

                        <div key={link.id}>

                            <p>{link.type}</p>

                            <a
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {link.url}
                            </a>

                            <button
                                onClick={() => handleDelete(link.id)}
                            >
                                Delete
                            </button>

                        </div>
                    ))
                )}

            </div>

        </div>
    );
};

export default AdminProjectLinks;