import { useState } from "react";

import useNewsBlogs from "../hooks/useNewsBlogs";

import {
    createNewsBlog,
    deleteNewsBlog
} from "../api/newsBlogApi";


const AdminNewsBlogs = () => {

    const { news, loading } = useNewsBlogs();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        news_link: ""
    });

    const [poster, setPoster] = useState(null);


    // HANDLE INPUT
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // CREATE NEWS
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            if (poster) {
                data.append("news_poster", poster);
            }

            await createNewsBlog(data);

            alert("News created successfully");

            window.location.reload();

        } catch (err) {

            console.log(err);

            alert("Failed to create news");
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

            window.location.reload();

        } catch (err) {

            console.log(err);

            alert("Failed to delete news");
        }
    };


    if (loading) {
        return <p>Loading...</p>;
    }


    return (
        <div>

            <h2>News / Blogs Admin</h2>


            {/* CREATE FORM */}
            <form onSubmit={handleSubmit}>

                {/* TITLE */}
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
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


                {/* LINK */}
                <input
                    type="url"
                    name="news_link"
                    placeholder="External Link"
                    value={formData.news_link}
                    onChange={handleChange}
                />


                {/* POSTER */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setPoster(e.target.files[0])
                    }
                />


                <button type="submit">
                    Create News
                </button>

            </form>


            {/* NEWS LIST */}
            <div>

                {news.map((item) => (

                    <div key={item.id}>

                        {item.news_poster && (
                            <img
                                src={`http://localhost:5000${item.news_poster}`}
                                width="120"
                                alt="poster"
                            />
                        )}

                        <h3>{item.title}</h3>

                        <p>{item.description}</p>

                        {item.news_link && (
                            <a
                                href={item.news_link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Visit Link
                            </a>
                        )}

                        <button
                            onClick={() =>
                                handleDelete(item.id)
                            }
                        >
                            Delete
                        </button>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default AdminNewsBlogs;