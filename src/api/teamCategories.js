import API from "../utils/api";

// GET categories
export const getTeamCategories = () =>
    API.get("/team-categories");

// CREATE category (optional for admin)
export const createTeamCategory = (data) =>
    API.post("/team-categories", data);

// DELETE category (optional)
export const deleteTeamCategory = (id) =>
    API.delete(`/team-categories/${id}`);