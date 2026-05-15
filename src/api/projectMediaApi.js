import API from "../utils/api";


// GET MEDIA BY PROJECT
export const getProjectMedia = async (projectId) => {
    return await API.get(`/project-media/${projectId}`);
};


// ADD MEDIA
export const addProjectMedia = async (data) => {
    return await API.post("/project-media", data);
};


// DELETE MEDIA
export const deleteProjectMedia = async (id) => {
    return await API.delete(`/project-media/${id}`);
};