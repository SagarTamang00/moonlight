import { useState } from "react";

import useProjects from "../hooks/useProjects";
import useProjectCategories from "../hooks/useProjectCategories";
import {
  createProject,
  deleteProject,
  updateProject,
} from "../api/projectApi";

const AdminProjects = () => {
  const { projects, loading } =
    useProjects();

  const { categories } =
    useProjectCategories();

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    description: "",
    duration: "",
    seasons: "",
    episodes: "",
    release_year: "",
    status: "upcoming",
    featured: false,
  });

  const [poster, setPoster] =
    useState(null);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
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

      if (isEditing) {
        await updateProject(editId, data);
        alert("Project updated successfully");
      } else {
        await createProject(data);
        alert("Project created successfully");
      }

      window.location.reload();
    } catch (err) {
      console.log(err);
      alert(isEditing ? "Failed to update project" : "Failed to create project");
    }
  };

  const handleEdit = (project) => {
    setIsEditing(true);
    setEditId(project.id);

    setFormData({
      category_id: project.category_id || "",
      title: project.title || "",
      description: project.description || "",
      duration: project.duration || "",
      seasons: project.seasons || "",
      episodes: project.episodes || "",
      release_year: project.release_year || "",
      status: project.status || "upcoming",
      featured: project.featured ? true : false,
    });
  };
  // DELETE PROJECT
  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this project?"
      );

    if (!confirmDelete) return;

    try {

      await deleteProject(id);

      alert(
        "Project deleted successfully"
      );

      window.location.reload();

    } catch (err) {

      console.log(err);

      alert(
        "Failed to delete project"
      );
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-black dark:text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6 md:p-10 transition-all duration-300">

      {/* HEADER */}
      <div className="mb-10">

        <h2
          style={{
            fontFamily:
              "'Syne', sans-serif",
          }}
          className="text-3xl font-bold text-black dark:text-white"
        >
          Projects
        </h2>

        <p className="text-gray-500 mt-2">
          Create and manage projects.
        </p>

      </div>

      {/* CREATE FORM */}
      <div className="bg-[#f7f7f7] dark:bg-[#111111] border border-[#e5e5e5] dark:border-[#222222] rounded-3xl p-6 md:p-8 mb-10">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          {/* CATEGORY */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Category
            </label>

            <select
              name="category_id"
              value={
                formData.category_id
              }
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            >

              <option value="">
                Select Category
              </option>

              {categories.map(
                (category) => (

                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                )
              )}
            </select>
          </div>

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Project Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Description
            </label>

            <textarea
              name="description"
              placeholder="Write description..."
              value={
                formData.description
              }
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all resize-none"
            />
          </div>

          {/* POSTER */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Poster
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={
                handlePosterChange
              }
              className="block w-full text-sm text-gray-600 dark:text-gray-300"
            />
          </div>

          {/* DURATION */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Duration
            </label>

            <input
              type="text"
              name="duration"
              placeholder="2h 30m"
              value={
                formData.duration
              }
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            />
          </div>

          {/* SEASONS */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Seasons
            </label>

            <input
              type="number"
              name="seasons"
              placeholder="0"
              value={
                formData.seasons
              }
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            />
          </div>

          {/* EPISODES */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Episodes
            </label>

            <input
              type="number"
              name="episodes"
              placeholder="0"
              value={
                formData.episodes
              }
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            />
          </div>

          {/* RELEASE YEAR */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Release Year
            </label>

            <input
              type="number"
              name="release_year"
              placeholder="2026"
              value={
                formData.release_year
              }
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
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
          </div>

          {/* FEATURED */}
          <div className="md:col-span-2 flex items-center gap-3 pt-2">

            <input
              type="checkbox"
              name="featured"
              checked={
                formData.featured
              }
              onChange={handleChange}
              className="w-5 h-5 accent-black dark:accent-white"
            />

            <label className="text-black dark:text-white font-medium">
              Featured Project
            </label>

          </div>

          {/* BUTTON */}
          <div className="md:col-span-2">

            <button
              type="submit"
              className="h-12 px-6 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-medium hover:scale-[1.02] transition-all duration-300"
            >
              {editId ? "Update Project" : "Create Project"}
            </button>

          </div>

        </form>
      </div>

      {/* PROJECT LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {projects.map((project) => (

          <div
            key={project.id}
            className="bg-[#f8f8f8] dark:bg-[#111111] border border-[#ececec] dark:border-[#222222] rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >

            {/* IMAGE */}
            <img
              src={`http://localhost:5000${project.poster}`}
              alt={project.title}
              className="w-full h-[260px] object-cover"
            />

            {/* CONTENT */}
            <div className="p-5">

              {/* CATEGORY */}
              <div className="mb-3">

                <span className="inline-flex items-center px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-medium">
                  {
                    project.category_name
                  }
                </span>

              </div>

              {/* TITLE */}
              <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                {project.title}
              </h3>

              {/* STATUS */}
              <p className="text-gray-500 capitalize mb-5">
                {project.status}
              </p>

              {/* FEATURED */}
              {project.featured && (
                <div className="mb-5">

                  <span className="inline-flex items-center px-3 py-1 rounded-full border border-black dark:border-white text-black dark:text-white text-xs font-medium">
                    Featured
                  </span>

                </div>
              )}
              {/* EDIT BUTTON */}
              <button
                onClick={() => handleEdit(project)}
                className="w-full h-11 rounded-2xl border border-black dark:border-white text-black dark:text-white mb-3"
              >
                Edit Project
              </button>

              {/* DELETE */}
              <button
                onClick={() =>
                  handleDelete(
                    project.id
                  )
                }
                className="w-full h-11 rounded-2xl bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-all duration-300"
              >
                Delete Project
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;