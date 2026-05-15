import API from "../utils/api";


// GET ALL PARTNERS
export const getPartners = async () => {
    return await API.get("/partners");
};


// CREATE PARTNER
export const createPartner = async (formData) => {
    return await API.post("/partners", formData);
};


// UPDATE PARTNER
export const updatePartner = async (id, formData) => {
    return await API.put(`/partners/${id}`, formData);
};


// DELETE PARTNER
export const deletePartner = async (id) => {
    return await API.delete(`/partners/${id}`);
};