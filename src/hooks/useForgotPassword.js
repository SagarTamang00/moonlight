import { useState } from "react";
import { forgotPassword } from "../utils/auth";

const useForgotPassword = () => {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const sendResetLink = async (email) => {

        setLoading(true);
        setSuccess(false);
        setError(null);

        try {

            const res = await forgotPassword(email);

            setSuccess(true);

            return res.data;

        } catch (err) {

            setError(
                err?.response?.data?.message ||
                "Something went wrong"
            );

        } finally {
            setLoading(false);
        }
    };

    return {
        sendResetLink,
        loading,
        success,
        error
    };
};

export default useForgotPassword;