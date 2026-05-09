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