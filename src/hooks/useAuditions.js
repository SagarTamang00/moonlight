import { useEffect, useState, useCallback } from "react";
import { getAuditions } from "../api/auditionApi";

const useAuditions = () => {

    const [auditions, setAuditions] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ stable refetch function
    const fetchAuditions = useCallback(async () => {

        try {
            setLoading(true);

            const res = await getAuditions();

            setAuditions(res.data.data);

        } catch (err) {
            console.log("Fetch auditions error:", err);
        } finally {
            setLoading(false);
        }

    }, []);

    useEffect(() => {
        fetchAuditions();
    }, [fetchAuditions]);

    return {
        auditions,
        loading,
        fetchAuditions,
        setAuditions // optional (for instant UI updates)
    };
};

export default useAuditions;