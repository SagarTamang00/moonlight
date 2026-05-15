import API from "../utils/api";


// GET
export const getProjectCategories = async () => {
    return await API.get("/project-categories");
};


// CREATE
export const createProjectCategory = async (data) => {
    return await API.post("/project-categories", data);
};


// DELETE
export const deleteProjectCategory = async (id) => {
    return await API.delete(`/project-categories/${id}`);
};