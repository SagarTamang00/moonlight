import API from "../utils/api";


// GET LINKS BY PROJECT
export const getProjectLinks = async (projectId) => {
    return await API.get(`/project-links/${projectId}`);
};


// CREATE LINK
export const createProjectLink = async (data) => {
    return await API.post("/project-links", data);
};


// DELETE LINK
export const deleteProjectLink = async (id) => {
    return await API.delete(`/project-links/${id}`);
};