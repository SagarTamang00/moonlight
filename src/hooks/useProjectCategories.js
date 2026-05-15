import { useEffect, useState } from "react";
import { getProjectCategories } from "../api/projectCategoryApi";

const useProjectCategories = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchCategories = async () => {

            try {

                const res = await getProjectCategories();

                setCategories(res.data.data);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);
            }
        };

        fetchCategories();

    }, []);

    return {
        categories,
        loading
    };
};

export default useProjectCategories;