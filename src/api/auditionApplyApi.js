import API from "../utils/api";


// APPLY FOR AUDITION
export const applyAudition = async (formData) => {
    return await API.post(
        "/auditions/apply",
        formData
    );
};