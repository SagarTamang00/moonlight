import API from "../utils/api";


// GET ALL NEWS
export const getNewsBlogs = async () => {
    return await API.get("/news-blogs");
};


// CREATE NEWS
export const createNewsBlog = async (formData) => {
    return await API.post("/news-blogs", formData);
};


// UPDATE NEWS
export const updateNewsBlog = async (id, formData) => {
    return await API.put(`/news-blogs/${id}`, formData);
};


// DELETE NEWS
export const deleteNewsBlog = async (id) => {
    return await API.delete(`/news-blogs/${id}`);
};