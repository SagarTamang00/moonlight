import API from "../utils/api";


// GET ALL AUDITIONS
export const getAuditions = async () => {
    return await API.get("/auditions");
};


// CREATE AUDITION
export const createAudition = async (formData) => {
    return await API.post("/auditions", formData);
};


// UPDATE STATUS
export const updateAuditionStatus = async (id, data) => {
    return await API.patch(`/auditions/${id}/status`, data);
};


// DELETE AUDITION
export const deleteAudition = async (id) => {
    return await API.delete(`/auditions/${id}`);
};