import API from "../utils/api";

// GET settings
export const getSettings = () =>
    API.get("/settings");

// UPDATE settings
export const updateSettings = (data) =>
    API.put("/settings", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });