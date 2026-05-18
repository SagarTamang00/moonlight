import API from "../utils/api";


// GET MEDIA BY PROJECT
export const getProjectMedia = async (projectId) => {
    return await API.get(`/project-media/${projectId}`);
};


// ADD MEDIA (MULTER UPLOAD)
export const addProjectMedia = async (data) => {
    return await API.post("/project-media", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};


// DELETE MEDIA
export const deleteProjectMedia = async (id) => {
    return await API.delete(`/project-media/${id}`);
};