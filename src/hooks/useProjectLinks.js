import { useEffect, useState, useCallback } from "react";
import { getProjectLinks } from "../api/projectLinkApi";

const useProjectLinks = (projectId) => {

    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ reusable fetch
    const fetchLinks = useCallback(async () => {

        if (!projectId) {
            setLinks([]);
            return;
        }

        try {
            setLoading(true);

            const res = await getProjectLinks(projectId);

            setLinks(res.data.data);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    return {
        links,
        loading,
        setLinks,
        fetchLinks   // 👈 IMPORTANT
    };
};

export default useProjectLinks;