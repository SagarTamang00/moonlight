import { useEffect, useState } from "react";

import { getProjects } from "../api/projectApi";


const useProjects = () => {

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchProjects = async () => {

            try {

                const res = await getProjects();

                setProjects(res.data.data);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);
            }
        };

        fetchProjects();

    }, []);


    return {
        projects,
        loading
    };
};

export default useProjects;