import API from "../utils/api";

// GET
export const getTeamMembers = () =>
    API.get("/team-members");

// CREATE (with image)
export const createTeamMember = (data) =>
    API.post("/team-members", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

export const updateTeamMember = (id, data) =>
    API.put(`/team-members/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

// DELETE
export const deleteTeamMember = (id) =>
    API.delete(`/team-members/${id}`);