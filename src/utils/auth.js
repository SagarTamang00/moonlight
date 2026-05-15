import API from "./api";

const checkAuthAndRedirect = async (navigate) => {
    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/admin/login");
        return;
    }

    try {
        await API.get("/admin/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        navigate("/admin/dashboard");
    } catch (error) {
        localStorage.removeItem("token");
        navigate("/admin/login");
    }
};

export default checkAuthAndRedirect;

// FORGOT PASSWORD
export const forgotPassword = async (email) => {
    return await API.post("/auth/forgot-password", { email });
};


// VERIFY TOKEN
export const verifyToken = async (token) => {
    return await API.post("/auth/verify-token", { token });
};


// RESET PASSWORD
export const resetPassword = async (data) => {
    return await API.post("/auth/reset-password", data);
};