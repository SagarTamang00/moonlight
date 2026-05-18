import { useState } from "react";
import useNewsBlogs from "../hooks/useNewsBlogs";

import {
  createNewsBlog,
  updateNewsBlog,
  deleteNewsBlog,
} from "../api/newsBlogApi";
import { BASE_URL } from "../utils/api";

const AdminNewsBlogs = () => {
  const { news, loading, fetchNews, setNews } = useNewsBlogs();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    news_link: "",
  });

  const [poster, setPoster] = useState(null);

  // EDIT STATE
  const [editId, setEditId] = useState(null);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE EDIT
  const handleEdit = (item) => {
    setEditId(item.id);

    setFormData({
      title: item.title || "",
      description: item.description || "",
      news_link: item.news_link || "",
    });
    // SCROLL TO TOP FORM
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("news_link", formData.news_link);

      // only send file if selected
      if (poster) {
        data.append("news_poster", poster);
      }

      if (editId) {
        await updateNewsBlog(editId, data);
        alert("News updated successfully");
      } else {
        await createNewsBlog(data);
        alert("News created successfully");
      }

      setFormData({
        title: "",
        description: "",
        news_link: "",
      });

      setPoster(null);
      setEditId(null);

      await fetchNews();

    } catch (err) {
      console.log(err);
      alert("Operation failed");
    }
  };
  // DELETE NEWS
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this news?"
    );

    if (!confirmDelete) return;

    try {

      await deleteNewsBlog(id);

      alert("News deleted successfully");

      await fetchNews();

    } catch (err) {

      console.log(err);

      alert("Failed to delete news");
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
          News & Blogs
        </h2>

        <p className="text-gray-500 mt-2">
          Create and manage news articles and blog posts.
        </p>

      </div>

      {/* FORM */}
      <div className="bg-[#f7f7f7] dark:bg-[#111111] border border-[#e5e5e5] dark:border-[#222222] rounded-3xl p-6 md:p-8 mb-10">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* TITLE */}
          <div>

            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            />

          </div>

          {/* DESCRIPTION */}
          <div>

            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Description
            </label>

            <textarea
              name="description"
              placeholder="Write description..."
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all resize-none"
            />

          </div>

          {/* LINK */}
          <div>

            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              External Link
            </label>

            <input
              type="url"
              name="news_link"
              placeholder="https://example.com"
              value={formData.news_link}
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-2xl border border-[#dcdcdc] dark:border-[#2a2a2a] bg-white dark:bg-[#181818] text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            />

          </div>

          {/* FILE */}
          <div>

            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Poster Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setPoster(e.target.files[0])
              }
              className="block w-full text-sm text-gray-600 dark:text-gray-300"
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="h-12 px-6 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-medium hover:scale-[1.02] transition-all duration-300"
          >
            {editId ? "Update News" : "Create News"}
          </button>

        </form>
      </div>

      {/* NEWS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {news.map((item) => (

          <div
            key={item.id}
            className="bg-[#f8f8f8] dark:bg-[#111111] border border-[#ececec] dark:border-[#222222] rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >

            {/* IMAGE */}
            {item.news_poster && (
              <img
                src={`${BASE_URL}${item.news_poster}`}

                alt="poster"
                className="w-full h-[220px] object-cover"
              />
            )}

            {/* CONTENT */}
            <div className="p-5">

              <h3 className="text-xl font-semibold text-black dark:text-white mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
                {item.description}
              </p>

              {/* ACTIONS */}
              <div className="flex items-center justify-between gap-3 flex-wrap">

                {item.news_link ? (
                  <a
                    href={item.news_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center h-11 px-5 rounded-2xl border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                  >
                    Visit Link
                  </a>
                ) : (
                  <div />
                )}

                <div className="flex gap-3">

                  {/* EDIT */}
                  <button
                    onClick={() => handleEdit(item)}
                    className="h-11 px-5 rounded-2xl border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                  >
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="h-11 px-5 rounded-2xl bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-all duration-300"
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default AdminNewsBlogs;