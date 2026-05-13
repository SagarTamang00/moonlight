import { useEffect, useState } from "react";
import API from "../utils/api";

const useSocialLinks = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLinks = async () => {
        try {
            const res = await API.get("/social-links");
            setLinks(res.data.data || []);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    return {
        links,
        loading,
        error,
        refetch: fetchLinks   // 🔥 IMPORTANT
    };
};

export default useSocialLinks;