import { useState } from "react";
import API from "../utils/api";
import checkAuthAndRedirect from "../utils/auth";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/admin/login", formData);

            console.log(res.data);

            localStorage.setItem("token", res.data.token);
            checkAuthAndRedirect(navigate);
        } catch (error) {
            console.log(error);
            alert("Login Failed");
        }
    };

    return (
        <div>
            <h1>Admin Login</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;