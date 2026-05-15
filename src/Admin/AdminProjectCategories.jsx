import { useState } from "react";

import useProjectCategories from "../hooks/useProjectCategories";

import {
  createProjectCategory,
  deleteProjectCategory,
} from "../api/projectCategoryApi";

const AdminProjectCategories = () => {
  const { categories, loading } =
    useProjectCategories();

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
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-3xl font-bold text-black dark:text-white"
        >
          Project Categories
        </h2>

        <p className="text-gray-500 mt-2">
          Create and manage project categories.
        </p>

      </div>

      {/* CREATE FORM */}
      <div className="bg-[#f7f7f7] dark:bg-[#111111] border border-[#e5e5e5] dark:border-[#222222] rounded-3xl p-6 md:p-8 mb-10">

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4"
        >

          {/* INPUT */}
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
            className="flex-1 h-12 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="h-12 px-6 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-medium hover:scale-[1.02] transition-all duration-300"
          >
            Add Category
          </button>

        </form>
      </div>

      {/* CATEGORY LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {categories.map((item) => (

          <div
            key={item.id}
            className="bg-[#f8f8f8] dark:bg-[#111111] border border-[#ececec] dark:border-[#222222] rounded-3xl p-6 flex items-center justify-between gap-4 transition-all duration-300 hover:-translate-y-1"
          >

            {/* CATEGORY NAME */}
            <div>

              <h3 className="text-lg font-semibold text-black dark:text-white">
                {item.name}
              </h3>

            </div>

            {/* DELETE BUTTON */}
            <button
              onClick={() =>
                handleDelete(item.id)
              }
              className="h-11 px-5 rounded-2xl bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-all duration-300 whitespace-nowrap"
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