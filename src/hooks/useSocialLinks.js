import { useEffect, useState } from "react";
import API from "../utils/api";

const useSocialLinks = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

        fetchLinks();
    }, []);

    return { links, loading, error };
};

export default useSocialLinks;