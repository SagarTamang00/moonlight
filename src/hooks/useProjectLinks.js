import { useEffect, useState } from "react";

import { getProjectLinks } from "../api/projectLinkApi";


const useProjectLinks = (projectId) => {

    const [links, setLinks] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        if (!projectId) return;

        const fetchLinks = async () => {

            try {

                const res = await getProjectLinks(projectId);

                setLinks(res.data.data);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);
            }
        };

        fetchLinks();

    }, [projectId]);


    return {
        links,
        loading
    };
};

export default useProjectLinks;