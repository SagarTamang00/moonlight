import API from "../utils/api";


// SEND CONTACT FORM
export const sendContactForm = async (data) => {
    return await API.post("/contact", data);
};