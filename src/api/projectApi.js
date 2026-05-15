import API from "../utils/api";


// GET ALL PROJECTS
export const getProjects = async () => {
    return await API.get("/projects");
};


// CREATE PROJECT
export const createProject = async (formData) => {
    return await API.post("/projects", formData);
};


// UPDATE PROJECT
export const updateProject = async (id, formData) => {
    return await API.put(`/projects/${id}`, formData);
};


// DELETE PROJECT
export const deleteProject = async (id) => {
    return await API.delete(`/projects/${id}`);
};