import { useState } from "react";

import useProjects from "../hooks/useProjects";
import useProjectMedia from "../hooks/useProjectMedia";

import {
  addProjectMedia,
  deleteProjectMedia,
} from "../api/projectMediaApi";
import { BASE_URL } from "../utils/api";

const AdminProjectMedia = () => {
  const { projects } = useProjects();

  const [selectedProject, setSelectedProject] =
    useState("");

  const { media, loading } =
    useProjectMedia(selectedProject);

  const [formData, setFormData] = useState({
    project_id: "",
    title: "",
  });

  const [file, setFile] = useState(null);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE PROJECT SELECT
  const handleProjectSelect = (e) => {
    const projectId = e.target.value;

    setSelectedProject(projectId);

    setFormData({
      ...formData,
      project_id: projectId,
    });
  };

  // FILE CHANGE
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ADD MEDIA
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image");
      return;
    }

    try {
      const data = new FormData();
      data.append("project_id", formData.project_id);
      data.append("title", formData.title);
      data.append("media", file); // MUST MATCH MULTER FIELD NAME

      await addProjectMedia(data);

      alert("Image added successfully");

      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Failed to add image");
    }
  };

  // DELETE MEDIA
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this image?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProjectMedia(id);

      alert("Image deleted successfully");

      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Failed to delete image");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6 md:p-10 transition-all duration-300">

      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-black dark:text-white">
          Project Media
        </h2>

        <p className="text-gray-500 mt-2">
          Manage project images.
        </p>
      </div>

      {/* SELECT PROJECT */}
      <div className="bg-[#f7f7f7] dark:bg-[#111111] border border-[#e5e5e5] dark:border-[#222222] rounded-3xl p-6 md:p-8 mb-8">

        <label className="block text-sm font-medium text-black dark:text-white mb-3">
          Select Project
        </label>

        <select
          value={selectedProject}
          onChange={handleProjectSelect}
          className="w-full h-12 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        >
          <option value="">Select Project</option>

          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>

      {/* ADD MEDIA FORM */}
      <div className="bg-[#f7f7f7] dark:bg-[#111111] border border-[#e5e5e5] dark:border-[#222222] rounded-3xl p-6 md:p-8 mb-10">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* TITLE */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Image Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter image title"
              value={formData.title}
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white"
            />
          </div>

          {/* FILE UPLOAD */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>

          {/* BUTTON */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="h-12 px-6 rounded-2xl bg-black text-white dark:bg-white dark:text-black"
            >
              Add Image
            </button>
          </div>
        </form>
      </div>

      {/* MEDIA LIST */}
      <div>
        {loading ? (
          <div className="text-black dark:text-white">
            Loading...
          </div>
        ) : media.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No images found for this project.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {media.map((item) => (
              <div
                key={item.id}
                className="bg-[#f8f8f8] dark:bg-[#111111] border rounded-3xl p-6"
              >
                {/* IMAGE */}
                <img
                  src={`${BASE_URL}/${item.image_path}`}
                  alt={item.title}

                  className="w-full h-48 object-cover rounded-2xl mb-4"
                />

                {/* TITLE */}
                <h3 className="text-lg font-semibold mb-4">
                  {item.title || "Untitled"}
                </h3>

                {/* ACTIONS */}
                <div className="flex gap-3">
                  <a

                    href={`${BASE_URL}${item.image_path}`}
                    target="_blank"
                    className="flex-1 text-center py-2 border rounded-xl"
                  >
                    Open
                  </a>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 py-2 bg-black text-white rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjectMedia;