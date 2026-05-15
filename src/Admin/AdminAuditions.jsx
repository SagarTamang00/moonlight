import { useState } from "react";

import useAuditions from "../hooks/useAuditions";

import {
  createAudition,
  updateAuditionStatus,
  deleteAudition,
} from "../api/auditionApi";

const AdminAuditions = () => {
  const { auditions, loading } = useAuditions();

  const [poster, setPoster] = useState(null);

  const [status, setStatus] = useState("open");

  // HANDLE FILE
  const handleFileChange = (e) => {
    setPoster(e.target.files[0]);
  };

  // CREATE AUDITION
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append(
        "audition_poster",
        poster
      );

      formData.append(
        "status",
        status
      );

      await createAudition(formData);

      alert("Audition created successfully");

      window.location.reload();

    } catch (err) {

      console.log(err);

      alert("Failed to create audition");
    }
  };

  // UPDATE STATUS
  const handleStatusChange = async (
    id,
    newStatus
  ) => {
    try {

      await updateAuditionStatus(id, {
        status: newStatus,
      });

      alert("Status updated");

      window.location.reload();

    } catch (err) {

      console.log(err);

      alert("Failed to update status");
    }
  };

  // DELETE
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this audition?"
    );

    if (!confirmDelete) return;

    try {

      await deleteAudition(id);

      alert("Audition deleted");

      window.location.reload();

    } catch (err) {

      console.log(err);

      alert("Failed to delete audition");
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
          Auditions
        </h2>

        <p className="text-gray-500 mt-2">
          Manage audition posters and status.
        </p>

      </div>

      {/* CREATE FORM */}
      <div className="bg-[#f7f7f7] dark:bg-[#111111] border border-[#e5e5e5] dark:border-[#222222] rounded-3xl p-6 md:p-8 mb-10">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* POSTER */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Audition Poster
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="block w-full text-sm text-gray-600 dark:text-gray-300"
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full h-12 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            >

              <option value="open">
                Open
              </option>

              <option value="closed">
                Closed
              </option>

            </select>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="h-12 px-6 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-medium hover:scale-[1.02] transition-all duration-300"
          >
            Create Audition
          </button>

        </form>
      </div>

      {/* AUDITION LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {auditions.map((item) => (

          <div
            key={item.id}
            className="bg-[#f8f8f8] dark:bg-[#111111] border border-[#ececec] dark:border-[#222222] rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >

            {/* IMAGE */}
            <img
              src={`http://localhost:5000${item.audition_poster}`}
              alt="Audition Poster"
              className="w-full h-[260px] object-cover"
            />

            {/* CONTENT */}
            <div className="p-5">

              {/* STATUS BADGE */}
              <div className="mb-4">

                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                  ${
                    item.status === "open"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-gray-200 text-black dark:bg-[#222] dark:text-white"
                  }`}
                >
                  {item.status === "open"
                    ? "Open"
                    : "Closed"}
                </span>

              </div>

              {/* STATUS UPDATE */}
              <div className="mb-5">

                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Update Status
                </label>

                <select
                  value={item.status}
                  onChange={(e) =>
                    handleStatusChange(
                      item.id,
                      e.target.value
                    )
                  }
                  className="w-full h-11 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                >

                  <option value="open">
                    Open
                  </option>

                  <option value="closed">
                    Closed
                  </option>

                </select>

              </div>

              {/* DELETE BUTTON */}
              <button
                onClick={() =>
                  handleDelete(item.id)
                }
                className="w-full h-11 rounded-2xl bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-all duration-300"
              >
                Delete Audition
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAuditions;