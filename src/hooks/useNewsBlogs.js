import { useEffect, useState, useCallback } from "react";
import { getNewsBlogs } from "../api/newsBlogApi";

const useNewsBlogs = () => {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ reusable fetch function
    const fetchNews = useCallback(async () => {
        try {
            setLoading(true);

            const res = await getNewsBlogs();

            setNews(res.data.data); // adjust if backend structure differs

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    return {
        news,
        loading,
        fetchNews,   // 👈 THIS replaces window.reload
        setNews      // optional (for instant UI update)
    };
};

export default useNewsBlogs;