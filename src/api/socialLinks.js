import API from "../utils/api";

export const createSocialLink = (data) =>
    API.post("/social-links", data);

export const deleteSocialLink = (id) =>
    API.delete(`/social-links/${id}`);