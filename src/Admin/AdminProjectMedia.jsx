import { useState } from "react";

import useProjects from "../hooks/useProjects";
import useProjectMedia from "../hooks/useProjectMedia";

import {
  addProjectMedia,
  deleteProjectMedia,
} from "../api/projectMediaApi";

const AdminProjectMedia = () => {
  const { projects } = useProjects();

  const [selectedProject, setSelectedProject] =
    useState("");

  const { media, loading } =
    useProjectMedia(selectedProject);

  const [formData, setFormData] = useState({
    project_id: "",
    type: "",
    media_url: "",
    title: "",
  });

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
    <div className="min-h-screen bg-white dark:bg-black p-6 md:p-10 transition-all duration-300">

      {/* HEADER */}
      <div className="mb-10">

        <h2
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-3xl font-bold text-black dark:text-white"
        >
          Project Media
        </h2>

        <p className="text-gray-500 mt-2">
          Manage images, videos and behind the scenes content.
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
          className="w-full h-12 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
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
      </div>

      {/* ADD MEDIA FORM */}
      <div className="bg-[#f7f7f7] dark:bg-[#111111] border border-[#e5e5e5] dark:border-[#222222] rounded-3xl p-6 md:p-8 mb-10">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          {/* TYPE */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Media Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
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
          </div>

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Media Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter media title"
              value={formData.title}
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            />
          </div>

          {/* MEDIA URL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Media URL
            </label>

            <input
              type="text"
              name="media_url"
              placeholder="https://example.com/media"
              value={formData.media_url}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            />
          </div>

          {/* BUTTON */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="h-12 px-6 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-medium hover:scale-[1.02] transition-all duration-300"
            >
              Add Media
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

          <div className="bg-[#f8f8f8] dark:bg-[#111111] border border-[#ececec] dark:border-[#222222] rounded-3xl p-10 text-center">

            <p className="text-gray-500">
              No media found for this project.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {media.map((item) => (

              <div
                key={item.id}
                className="bg-[#f8f8f8] dark:bg-[#111111] border border-[#ececec] dark:border-[#222222] rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1"
              >

                {/* TYPE */}
                <div className="mb-4">

                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-medium capitalize">
                    {item.type}
                  </span>

                </div>

                {/* TITLE */}
                <h3 className="text-xl font-semibold text-black dark:text-white mb-3">
                  {item.title || "Untitled Media"}
                </h3>

                {/* URL */}
                <a
                  href={item.media_url}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-gray-600 dark:text-gray-400 break-all hover:text-black dark:hover:text-white transition-all mb-6"
                >
                  {item.media_url}
                </a>

                {/* ACTIONS */}
                <div className="flex items-center gap-3">

                  <a
                    href={item.media_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 h-11 rounded-2xl border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 flex items-center justify-center"
                  >
                    Open
                  </a>

                  <button
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    className="flex-1 h-11 rounded-2xl bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-all duration-300"
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