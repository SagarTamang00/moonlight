import { useEffect, useState, useCallback } from "react";
import { getProjectMedia } from "../api/projectMediaApi";

const useProjectMedia = (projectId) => {

    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(false);

    // FETCH MEDIA
    const fetchMedia = useCallback(async () => {

        if (!projectId) {
            setMedia([]);
            return;
        }

        try {
            setLoading(true);

            const res = await getProjectMedia(projectId);

            setMedia(res?.data?.data || []);

        } catch (err) {
            console.log(err);
            setMedia([]);
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        fetchMedia();
    }, [fetchMedia]);

    return {
        media,
        setMedia,

        loading,

        fetchMedia, // manual refresh after upload/delete
    };
};

export default useProjectMedia;