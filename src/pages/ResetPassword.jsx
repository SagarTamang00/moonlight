import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { resetPassword } from "../api/authApi";

const ResetPassword = () => {

    const [searchParams] = useSearchParams();

    // get token from URL
    const token = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!token) {
            setError("Invalid or missing token");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {

            await resetPassword({
                token,
                newPassword
            });

            setSuccess(true);

            setNewPassword("");
            setConfirmPassword("");

        } catch (err) {

            setError(
                err?.response?.data?.message ||
                "Reset failed"
            );

        } finally {
            setLoading(false);
        }
    };


    return (
        <div style={{ maxWidth: "400px", margin: "auto" }}>

            <h2>Reset Password</h2>


            <form onSubmit={handleSubmit}>


                {/* NEW PASSWORD */}
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />


                {/* CONFIRM PASSWORD */}
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />


                <button type="submit" disabled={loading}>
                    {loading ? "Resetting..." : "Reset Password"}
                </button>

            </form>


            {/* SUCCESS */}
            {success && (
                <p style={{ color: "green" }}>
                    Password reset successful ✔ You can now login.
                </p>
            )}


            {/* ERROR */}
            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

        </div>
    );
};

export default ResetPassword;