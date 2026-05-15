import { useState } from "react";

import useProjects from "../hooks/useProjects";
import useProjectMedia from "../hooks/useProjectMedia";

import {
    addProjectMedia,
    deleteProjectMedia
} from "../api/projectMediaApi";


const AdminProjectMedia = () => {

    const { projects } = useProjects();

    const [selectedProject, setSelectedProject] = useState("");

    const { media, loading } = useProjectMedia(selectedProject);


    const [formData, setFormData] = useState({
        project_id: "",
        type: "",
        media_url: "",
        title: ""
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


    // ADD MEDIA
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await addProjectMedia(formData);

            alert("Media added successfully");

            window.location.reload();

        } catch (err) {

            console.log(err);

            alert("Failed to add media");
        }
    };


    // DELETE MEDIA
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this media?"
        );

        if (!confirmDelete) return;

        try {

            await deleteProjectMedia(id);

            alert("Media deleted successfully");

            window.location.reload();

        } catch (err) {

            console.log(err);

            alert("Failed to delete media");
        }
    };


    return (
        <div>

            <h2>Project Media Admin</h2>


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


            {/* ADD MEDIA FORM */}
            <form onSubmit={handleSubmit}>

                {/* TYPE */}
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Media Type
                    </option>

                    <option value="image">
                        Image
                    </option>

                    <option value="video">
                        Video
                    </option>

                    <option value="bts">
                        Behind The Scenes
                    </option>

                </select>


                {/* MEDIA URL */}
                <input
                    type="text"
                    name="media_url"
                    placeholder="Media URL"
                    value={formData.media_url}
                    onChange={handleChange}
                    required
                />


                {/* TITLE */}
                <input
                    type="text"
                    name="title"
                    placeholder="Media Title"
                    value={formData.title}
                    onChange={handleChange}
                />


                <button type="submit">
                    Add Media
                </button>

            </form>


            {/* MEDIA LIST */}
            <div>

                {loading ? (

                    <p>Loading...</p>

                ) : (

                    media.map((item) => (

                        <div key={item.id}>

                            <p>{item.type}</p>

                            <p>{item.title}</p>

                            <a
                                href={item.media_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Open Media
                            </a>

                            <button
                                onClick={() => handleDelete(item.id)}
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

export default AdminProjectMedia;