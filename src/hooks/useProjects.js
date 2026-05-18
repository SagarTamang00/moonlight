import { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi";

const useProjects = () => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            setLoading(true);

            const res = await getProjects();

            setProjects(res.data.data);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return {
        projects,
        setProjects, // IMPORTANT
        loading,
        refetch: fetchProjects
    };
};

export default useProjects;