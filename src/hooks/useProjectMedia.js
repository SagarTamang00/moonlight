import { useEffect, useState } from "react";

import { getProjectMedia } from "../api/projectMediaApi";


const useProjectMedia = (projectId) => {

    const [media, setMedia] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        if (!projectId) return;

        const fetchMedia = async () => {

            try {

                const res = await getProjectMedia(projectId);

                setMedia(res.data.data);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);
            }
        };

        fetchMedia();

    }, [projectId]);


    return {
        media,
        loading
    };
};

export default useProjectMedia;