import { useEffect, useState } from "react";
import { getTeamCategories } from "../api/teamCategories";

const useTeamCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = () => {
        setLoading(true);

        getTeamCategories()
            .then(res => setCategories(res.data.data))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return {
        categories,
        loading,
        refetch: fetchCategories
    };
};

export default useTeamCategories;