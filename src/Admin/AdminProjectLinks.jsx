import { useState } from "react";

import useProjects from "../hooks/useProjects";
import useProjectLinks from "../hooks/useProjectLinks";

import {
  createProjectLink,
  deleteProjectLink,
} from "../api/projectLinkApi";

const AdminProjectLinks = () => {
  const { projects } = useProjects();

  const [selectedProject, setSelectedProject] =
    useState("");

  const { links, loading } =
    useProjectLinks(selectedProject);

  const [formData, setFormData] = useState({
    project_id: "",
    type: "",
    url: "",
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
    <div className="min-h-screen bg-white dark:bg-black p-6 md:p-10 transition-all duration-300">

      {/* HEADER */}
      <div className="mb-10">

        <h2
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-3xl font-bold text-black dark:text-white"
        >
          Project Links
        </h2>

        <p className="text-gray-500 mt-2">
          Manage trailers, teasers, promos, playlists and watch links.
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

      {/* CREATE FORM */}
      <div className="bg-[#f7f7f7] dark:bg-[#111111] border border-[#e5e5e5] dark:border-[#222222] rounded-3xl p-6 md:p-8 mb-10">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >

          {/* TYPE */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Link Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
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
          </div>

          {/* URL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              URL
            </label>

            <input
              type="url"
              name="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            />
          </div>

          {/* BUTTON */}
          <div className="md:col-span-3">
            <button
              type="submit"
              className="h-12 px-6 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-medium hover:scale-[1.02] transition-all duration-300"
            >
              Add Link
            </button>
          </div>

        </form>
      </div>

      {/* LINKS LIST */}
      <div>

        {loading ? (

          <div className="text-black dark:text-white">
            Loading...
          </div>

        ) : links.length === 0 ? (

          <div className="bg-[#f8f8f8] dark:bg-[#111111] border border-[#ececec] dark:border-[#222222] rounded-3xl p-10 text-center">

            <p className="text-gray-500">
              No links found for this project.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {links.map((link) => (

              <div
                key={link.id}
                className="bg-[#f8f8f8] dark:bg-[#111111] border border-[#ececec] dark:border-[#222222] rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1"
              >

                {/* TYPE */}
                <div className="mb-4">

                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-medium capitalize">
                    {link.type}
                  </span>

                </div>

                {/* URL */}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-gray-600 dark:text-gray-400 break-all hover:text-black dark:hover:text-white transition-all mb-6"
                >
                  {link.url}
                </a>

                {/* DELETE */}
                <button
                  onClick={() =>
                    handleDelete(link.id)
                  }
                  className="w-full h-11 rounded-2xl bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-all duration-300"
                >
                  Delete Link
                </button>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjectLinks;