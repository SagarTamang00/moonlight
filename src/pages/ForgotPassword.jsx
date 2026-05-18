import { useState } from "react";
import useForgotPassword from "../hooks/useForgotPassword";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const {
        sendResetLink,
        loading,
        success,
        error
    } = useForgotPassword();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) return;

        await sendResetLink(email);
        setEmail("");
    };

    return (
        <div>
            <h2>Forgot Password</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>

            {success && (
                <p style={{ color: "green" }}>
                    Reset link sent successfully ✔
                </p>
            )}

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}
        </div>
    );
};

export default ForgotPassword;