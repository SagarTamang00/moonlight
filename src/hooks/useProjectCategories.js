import { useEffect, useState, useCallback } from "react";
import { getProjectCategories } from "../api/projectCategoryApi";

const useProjectCategories = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ reusable fetch function
    const fetchCategories = useCallback(async () => {

        try {
            setLoading(true);

            const res = await getProjectCategories();

            setCategories(res.data.data);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        categories,
        loading,
        setCategories,     // optional for instant UI updates
        fetchCategories    // 👈 IMPORTANT for refetch instead of reload
    };
};

export default useProjectCategories;