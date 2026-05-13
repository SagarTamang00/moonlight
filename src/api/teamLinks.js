import API from "../utils/api";

// GET links for a member
export const getMemberLinks = (memberId) =>
    API.get(`/team-member-links/${memberId}`);

// CREATE link
export const createMemberLink = (data) =>
    API.post("/team-member-links", data);

// DELETE link
export const deleteMemberLink = (id) =>
    API.delete(`/team-member-links/${id}`);